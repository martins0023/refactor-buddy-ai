import { useState } from 'react'
import { FileTree, FileNode } from '@/components/FileTree'
import { CodeEditor } from '@/components/CodeEditor'
import { SuggestionsPanel } from '@/components/SuggestionsPanel'
import { Button } from '@/components/ui/button'
import { 
  PanelLeftOpen, 
  PanelRightOpen, 
  PanelLeftClose, 
  PanelRightClose,
  Settings,
  Download,
  Share
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AnalysisView() {
  const [selectedFile, setSelectedFile] = useState<string>('3') // UserProfile.tsx
  const [isFileTreeOpen, setIsFileTreeOpen] = useState(true)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true)

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file.id)
  }

  const handleSuggestionApply = (suggestion: any) => {
    // Handle suggestion application
    console.log('Applying suggestion:', suggestion)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* File Tree Panel */}
      <div className={cn(
        "border-r border-border bg-card transition-all duration-300 flex-shrink-0",
        isFileTreeOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
        {isFileTreeOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-headline font-semibold text-foreground">Files</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsFileTreeOpen(false)}
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <FileTree 
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            {!isFileTreeOpen && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsFileTreeOpen(true)}
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            )}
            
            <div className="text-sm font-body text-muted-foreground">
              Code Analysis View
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
              <Share className="h-4 w-4" />
              Share
            </Button>
            
            <Button variant="ghost" size="icon-sm">
              <Settings className="h-4 w-4" />
            </Button>

            {!isSuggestionsOpen && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsSuggestionsOpen(true)}
              >
                <PanelRightOpen className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Editor and Suggestions Layout */}
        <div className="flex-1 flex min-h-0">
          {/* Code Editor */}
          <div className="flex-1 min-w-0">
            <CodeEditor 
              selectedFile={selectedFile}
              onSuggestionApply={handleSuggestionApply}
            />
          </div>

          {/* Suggestions Panel */}
          <div className={cn(
            "border-l border-border bg-card transition-all duration-300 flex-shrink-0",
            isSuggestionsOpen ? "w-96" : "w-0 overflow-hidden"
          )}>
            {isSuggestionsOpen && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border bg-card">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-headline font-semibold text-foreground">Suggestions</h2>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setIsSuggestionsOpen(false)}
                    >
                      <PanelRightClose className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 min-h-0">
                  <SuggestionsPanel />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}