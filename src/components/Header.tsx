import { Moon, Sun, Settings, HelpCircle, Zap, FileCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ThemeProvider'

export function Header() {
  const { theme, toggleTheme, themeName } = useTheme()

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-foreground">CRON</h1>
              <p className="text-xs text-muted-foreground font-body">AI Code Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <FileCode className="h-4 w-4" />
              <span>Ready to analyze</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
            title={`Switch to ${theme === 'light' ? 'Dark Matter' : 'Solar Flare'} theme`}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>

          <div className="hidden sm:block text-xs font-body text-muted-foreground">
            {themeName}
          </div>
        </div>
      </div>
    </header>
  )
}