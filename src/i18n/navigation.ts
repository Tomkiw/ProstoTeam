import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Використовуйте ці Link / useRouter замість next/link і next/navigation — вони додають мову в URL.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
