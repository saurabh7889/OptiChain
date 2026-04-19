import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground animate-pulse">
        <Sun className="w-5 h-5" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-all duration-200 border border-transparent hover:border-border group"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
