
'use client';

import { motion, Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  stagger?: number;
  staggerDirection?: 'up' | 'down' | 'left' | 'right';
}

const fadeInVariants: Variants = {
  hidden: (yOffset: number) => ({ opacity: 0, y: yOffset }),
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const staggerVariants: Variants = {
  hidden: {},
  visible: ({ stagger, staggerDirection }: {stagger: number; staggerDirection: string}) => ({
    transition: {
      staggerChildren: stagger,
      staggerDirection: staggerDirection === 'up' || staggerDirection === 'left' ? -1 : 1,
    },
  }),
};

export function FadeIn({
  children,
  className,
  delay = 0,
  yOffset = 24,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  stagger = 0.1,
  staggerDirection = 'down',
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      custom={{ stagger, staggerDirection }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
