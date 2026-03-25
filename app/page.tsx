"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import enUS from "@/i18n/en-US.json";
import esES from "@/i18n/es-ES.json";
import ptBR from "@/i18n/pt-BR.json";
import {
  Code2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  Youtube,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const dataCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;
const SUPPORTED_LOCALES = ["pt-BR", "en-US", "es-ES"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];
type Translations = Record<string, any>;

const translationsByLocale: Record<Locale, Translations> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
};

interface ISkill {
  name: string;
  variants?: string[];
}

interface IProject {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  url: string;
  imageUrl: string | null;
}

interface IExperience {
  name: string;
  logo: string | null;
  description?: string;
  period?: string;
}

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='20' y='25' font-size='14' text-anchor='middle' fill='%23999' font-family='Arial'%3E%3F%3C/text%3E%3C/svg%3E";

const buildProjectPlaceholder = (text: string): string => {
  const encodedText = encodeURIComponent(text);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 260 112'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f0f0f0'/%3E%3Cstop offset='100%25' stop-color='%23e0e0e0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='260' height='112' fill='url(%23g)'/%3E%3Ctext x='130' y='65' font-size='16' text-anchor='middle' fill='%23999' font-family='Arial'%3E${encodedText}%3C/text%3E%3C/svg%3E`;
};

export default function Home() {
  const { setTheme } = useTheme();
  const [locale, setLocale] = useState<Locale>("pt-BR");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [projectCategory, setProjectCategory] = useState("all");
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(5);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorKey, setErrorKey] = useState<
    "common.error.message" | "common.error.unexpected" | null
  >(null);

  const currentYear = new Date().getFullYear();
  const translations = useMemo(() => translationsByLocale[locale], [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const translation = key.split(".").reduce<any>((current, part) => {
        if (!current || typeof current !== "object") {
          return undefined;
        }

        return current[part];
      }, translations);

      const fallbackValue = typeof translation === "string" ? translation : key;

      if (!params) {
        return fallbackValue;
      }

      return Object.entries(params).reduce((value, [paramKey, paramValue]) => {
        return value.replaceAll(`{{${paramKey}}}`, String(paramValue));
      }, fallbackValue);
    },
    [translations]
  );

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("locale");

    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale as Locale)) {
      setLocale(savedLocale as Locale);
      return;
    }

    const browserLocale = navigator.language;
    const exactMatch = SUPPORTED_LOCALES.find(
      (supportedLocale) => supportedLocale === browserLocale
    );

    if (exactMatch) {
      setLocale(exactMatch);
      return;
    }

    const languagePrefix = browserLocale.split("-")[0];
    const prefixMatch = SUPPORTED_LOCALES.find((supportedLocale) =>
      supportedLocale.startsWith(languagePrefix)
    );

    if (prefixMatch) {
      setLocale(prefixMatch);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const isValidUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const cleanUrl = (url: string | null): string | null => {
    if (!url) return null;
    let cleaned = url.trim();
    cleaned = cleaned.replace(/%20/g, "");
    if (cleaned.startsWith("//")) {
      cleaned = "https:" + cleaned;
    } else if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
      if (cleaned.includes(".")) {
        cleaned = "https://" + cleaned;
      }
    }
    return cleaned;
  };

  const fetchWithCache = useCallback(async <T,>(key: string, url: string): Promise<T> => {
    const cached = dataCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    dataCache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }, []);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setErrorKey(null);

      try {
        const [skillsData, projectsData, experiencesData] = await Promise.allSettled([
          fetchWithCache<ISkill[]>(
            "skills",
            "https://raw.githubusercontent.com/ReeseArch64/reesearch64-api/refs/heads/main/api/data/skills.json"
          ),
          fetchWithCache<IProject[]>(
            "projects",
            "https://raw.githubusercontent.com/ReeseArch64/reesearch64-api/refs/heads/main/api/data/projects.json"
          ),
          fetchWithCache<IExperience[]>(
            "experiences",
            "https://raw.githubusercontent.com/ReeseArch64/reesearch64-api/refs/heads/main/api/data/experiences.json"
          ),
        ]);

        if (skillsData.status === "fulfilled") {
          const formattedSkills = Array.isArray(skillsData.value)
            ? skillsData.value.map((skill: any) => ({
                name: typeof skill === "string" ? skill : skill.name,
                variants: skill.variants || [],
              }))
            : [];
          setSkills(formattedSkills);
        } else {
          console.error("Falha ao carregar skills:", skillsData.reason);
          setSkills([]);
        }

        if (projectsData.status === "fulfilled") {
          const formattedProjects = Array.isArray(projectsData.value)
            ? projectsData.value.map((project) => ({
                ...project,
                imageUrl: project.imageUrl || null,
              }))
            : [];
          setProjects(formattedProjects);
        } else {
          console.error("Falha ao carregar projetos:", projectsData.reason);
          setProjects([]);
        }

        if (experiencesData.status === "fulfilled") {
          const formattedExperiences = Array.isArray(experiencesData.value)
            ? experiencesData.value.map((exp) => ({
                ...exp,
                logo: exp.logo || null,
              }))
            : [];
          setExperiences(formattedExperiences);
        } else {
          console.error("Falha ao carregar experiências:", experiencesData.reason);
          setExperiences([]);
        }

        if (
          skillsData.status === "rejected" &&
          projectsData.status === "rejected" &&
          experiencesData.status === "rejected"
        ) {
          setErrorKey("common.error.message");
        }
      } catch (error) {
        console.error("Erro crítico ao carregar dados:", error);
        setErrorKey("common.error.unexpected");
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [fetchWithCache]);

  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return skills;

    const normalizedSearch = searchTerm.toLowerCase().trim();

    return skills.filter((skill) => {
      const nameMatch = skill.name.toLowerCase().includes(normalizedSearch);
      const variantMatch =
        skill.variants?.some((variant) => variant.toLowerCase().includes(normalizedSearch)) ??
        false;

      return nameMatch || variantMatch;
    });
  }, [searchTerm, skills]);

  const projectCategories = useMemo(() => {
    const categories = projects.map((p) => p.category);
    return [
      { value: "all", label: t("projects.categories.all") },
      ...new Set(categories).values().map((category) => ({ value: category, label: category })),
    ];
  }, [projects, t]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !projectSearchTerm.trim() ||
        (() => {
          const search = projectSearchTerm.toLowerCase().trim();
          return (
            project.title.toLowerCase().includes(search) ||
            project.summary.toLowerCase().includes(search) ||
            project.stack.some((tech) => tech.toLowerCase().includes(search)) ||
            project.category.toLowerCase().includes(search)
          );
        })();

      const matchesCategory = projectCategory === "all" || project.category === projectCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projectSearchTerm, projectCategory, projects]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleProjectsCount);
  }, [filteredProjects, visibleProjectsCount]);

  useEffect(() => {
    setVisibleProjectsCount(5);
  }, [projectSearchTerm, projectCategory]);

  const getImageUrl = (url: string | null, type: "project" | "experience" = "project"): string => {
    const cleanedUrl = cleanUrl(url);
    if (cleanedUrl && isValidUrl(cleanedUrl)) {
      return cleanedUrl;
    }
    return type === "project"
      ? buildProjectPlaceholder(t("common.image.notAvailable"))
      : PLACEHOLDER_IMAGE;
  };

  const footerCreditText = t("footer.credit", {
    name: t("footer.name"),
    year: currentYear,
  })
    .replace("<span>", "")
    .replace("</span>", "");

  const localeLabel = useMemo(() => {
    if (locale === "en-US") {
      return "EN";
    }

    if (locale === "es-ES") {
      return "ES";
    }

    return "PT";
  }, [locale]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground mt-4">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (errorKey) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md p-6 text-center">
          <div className="bg-destructive/10 mx-auto w-fit rounded-full p-3">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{t("common.error.title")}</h2>
          <p className="text-muted-foreground mt-2">{t(errorKey)}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            {t("common.error.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="from-background via-background to-secondary/20 relative flex min-h-dvh flex-col bg-gradient-to-b">
      <div className="from-primary/10 absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="from-primary to-primary/60 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
              <Code2 className="text-primary-foreground h-4 w-4" />
            </div>
            <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight text-transparent">
              {t("header.logo")}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-3 text-xs font-semibold"
                >
                  {localeLabel}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => setLocale("pt-BR")}>Português</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("en-US")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("es-ES")}>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">{t("header.theme.toggle")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t("header.theme.light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t("header.theme.dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  {t("header.theme.system")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>

      <main className="flex-grow px-4 py-8">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <section className="from-primary/5 via-primary/5 to-secondary/5 relative overflow-hidden rounded-xl bg-gradient-to-br p-8 md:p-12">
            <div className="bg-grid-white/10 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="relative">
                <div className="from-primary to-secondary absolute inset-0 rounded-full bg-gradient-to-tr opacity-20 blur-xl" />
                <Image
                  src="https://avatars.githubusercontent.com/u/195439767?s=256&v=4"
                  alt={t("profile.photoAlt")}
                  className="border-background relative h-32 w-32 rounded-full border-4 object-cover shadow-xl transition-transform hover:scale-105"
                  priority
                />
              </div>
              <div className="flex-1 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {t("profile.name")}
                </h1>
                <p className="text-muted-foreground text-lg">{t("profile.role")}</p>
                <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
                  {t("profile.description")}
                </p>
              </div>
            </div>
          </section>

          <section id="habilidades" className="scroll-mt-20">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Sparkles className="text-primary h-5 w-5" />
                      {t("skills.title")}
                    </CardTitle>
                    <CardDescription>{t("skills.description")}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="hidden sm:flex">
                    {t("skills.count", { count: filteredSkills.length })}
                  </Badge>
                </div>

                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={t("skills.searchPlaceholder")}
                    className="bg-background w-full pl-9 transition-all focus-visible:ring-2"
                    aria-label="Buscar habilidades"
                  />
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {filteredSkills.map((skill, index) => (
                    <Button
                      key={skill.name}
                      variant="outline"
                      className="group hover:border-primary/50 hover:bg-primary/5 relative h-auto py-3 transition-all hover:scale-105"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span className="relative z-10 font-medium">{skill.name}</span>
                      <div className="from-primary/0 via-primary/10 to-primary/0 absolute inset-0 -z-10 rounded-md bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />
                    </Button>
                  ))}
                </div>

                {filteredSkills.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-muted rounded-full p-3">
                      <Search className="text-muted-foreground h-6 w-6" />
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">
                      {t("skills.noResults", { searchTerm })}
                    </p>
                    <Button variant="link" className="mt-2" onClick={() => setSearchTerm("")}>
                      {t("skills.clearSearch")}
                    </Button>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-muted/50 border-t py-4">
                <p className="text-muted-foreground w-full text-center text-sm">
                  {t("skills.footer")}
                </p>
              </CardFooter>
            </Card>
          </section>

          <section id="projetos" className="scroll-mt-20">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{t("projects.title")}</CardTitle>
                    <CardDescription>{t("projects.description")}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {t("projects.results", { count: filteredProjects.length })}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="relative md:col-span-2">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      type="text"
                      value={projectSearchTerm}
                      onChange={(event) => setProjectSearchTerm(event.target.value)}
                      placeholder={t("projects.searchPlaceholder")}
                      className="bg-background pl-9"
                      aria-label="Buscar projetos"
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {projectCategories.find((category) => category.value === projectCategory)
                          ?.label ?? t("projects.categories.all")}
                        <span className="text-muted-foreground text-xs">
                          {t("projects.categoryFilter")}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56"
                    >
                      {projectCategories.map((category) => (
                        <DropdownMenuItem
                          key={category.value}
                          onClick={() => setProjectCategory(category.value)}
                        >
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {visibleProjects.length > 0 ? (
                  <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
                    {visibleProjects.map((project, index) => (
                      <article
                        key={project.title}
                        className="group bg-card hover:border-primary/40 max-w-[260px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-lg border transition-all hover:-translate-y-1 hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 60}ms` }}
                      >
                        <div
                          className="h-28 bg-cover bg-center p-4"
                          style={{
                            backgroundImage: `url(${getImageUrl(project.imageUrl, "project")})`,
                            backgroundColor: "#f5f5f5",
                          }}
                        >
                          <div className="bg-background/80 inline-flex rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
                            {project.category}
                          </div>
                        </div>
                        <div className="space-y-3 p-4">
                          <h3 className="line-clamp-1 font-semibold">{project.title}</h3>
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {project.summary}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <Badge
                                key={`${project.title}-${tech}`}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          {project.url && (
                            <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
                              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                {t("projects.viewProject")}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
                    {t("projects.noResults")}
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-muted/50 flex flex-wrap items-center justify-between gap-3 border-t py-4">
                <p className="text-muted-foreground text-sm">
                  {t("projects.footer.showing", {
                    visible: visibleProjects.length,
                    total: filteredProjects.length,
                  })}
                </p>

                {visibleProjectsCount < filteredProjects.length && (
                  <Button onClick={() => setVisibleProjectsCount((previous) => previous + 5)}>
                    {t("projects.footer.loadMore")}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </section>

          <section id="experiencias" className="scroll-mt-20">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t("experiences.title")}</CardTitle>
                <CardDescription>{t("experiences.description")}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {experiences.map((experience) => (
                    <div
                      key={experience.name}
                      className="group bg-card hover:border-primary/40 rounded-lg border p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="bg-muted/40 flex h-20 items-center justify-center rounded-md p-2">
                        {experience.logo && isValidUrl(cleanUrl(experience.logo)) ? (
                          <Image
                            src={cleanUrl(experience.logo) || ""}
                            alt={t("common.image.alt", { name: experience.name })}
                            width={56}
                            height={56}
                            unoptimized
                            className="h-14 w-auto object-contain"
                          />
                        ) : (
                          <Image
                            src={PLACEHOLDER_IMAGE}
                            alt={t("common.image.alt", { name: experience.name })}
                            width={56}
                            height={56}
                            unoptimized
                            className="h-14 w-auto object-contain"
                          />
                        )}
                      </div>
                      <p className="text-foreground mt-3 text-center text-sm font-medium">
                        {experience.name}
                      </p>
                      {experience.description && (
                        <p className="text-muted-foreground mt-1 text-center text-xs">
                          {experience.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-border/40 bg-background/95 relative mt-12 border-t backdrop-blur">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <p className="text-muted-foreground text-sm">{footerCreditText}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 rounded-full"
            >
              <Link
                href="https://github.com/reesearch64"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 transition-transform hover:scale-110" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 rounded-full"
            >
              <Link
                href="https://linkedin.com/in/reesearch64"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 transition-transform hover:scale-110" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 rounded-full"
            >
              <Link
                href="https://youtube.com/@reesearch64"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 transition-transform hover:scale-110" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 rounded-full"
            >
              <Link
                href="https://instagram.com/reesearch64"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 transition-transform hover:scale-110" />
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 rounded-full"
            >
              <Link
                href="mailto:contact@reesearch64.tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 transition-transform hover:scale-110" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
