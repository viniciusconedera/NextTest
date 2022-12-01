import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode | undefined;
  title?: string;
}

export function Layout({children, title}: LayoutProps) {
  return (
    <>
    <Head>
      <title>{title ? (title + ' : My job board') : 'My job board'}</title>
    </Head>
      <header>
        <h1>My job Board</h1>
        <nav style={{display: 'flex',gap: '16px'}}>
          <Link href='/'>Home</Link>
          <Link href='/about' prefetch={false}>About</Link>
        </nav>
        <hr />
      </header>
      <main>{children}</main>
    </>
  )
}