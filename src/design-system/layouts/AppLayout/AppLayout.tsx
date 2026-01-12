/**
 * GREEN CHEMISTRY COCKPIT - APP LAYOUT
 * Main application layout with sidebar and header
 */

import { ReactNode } from 'react';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className={styles.layout}>
            {/* Main content area */}
            <main className={styles.main}>
                <header className={styles.header}>
                    {/* Header content placeholder */}
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
