import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Download, RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockCode = `import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';

// TODO: This component has performance issues
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Performance issue: This effect runs on every render
  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await UserService.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Code smell: Multiple early returns
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
};

export default UserProfile;`

interface CodeEditorProps {
  selectedFile?: string
  onSuggestionApply?: (suggestion: any) => void
}

export function CodeEditor({ selectedFile, onSuggestionApply }: CodeEditorProps) {
  const [code, setCode] = useState(mockCode)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      onSuggestionApply?.({
        type: 'performance',
        message: 'Analysis complete - 3 optimization opportunities found'
      })
    }, 2000)
  }

  const lineNumbers = code.split('\n').map((_, index) => index + 1)

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-headline font-semibold text-foreground">
            {selectedFile || 'UserProfile.tsx'}
          </h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-status-warning animate-pulse"></div>
            <span className="text-xs text-muted-foreground font-body">3 issues detected</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="cron"
            size="sm"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="gap-2"
          >
            <Sparkles className={cn("h-4 w-4", isAnalyzing && "animate-spin")} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </Button>
          
          <Button variant="ghost" size="icon-sm">
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon-sm">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon-sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex bg-editor-background">
        {/* Line Numbers */}
        <div className="w-12 bg-editor-background border-r border-border p-2 select-none">
          {lineNumbers.map((num) => (
            <div
              key={num}
              className="text-xs font-code text-editor-line-number text-right leading-6 px-1"
            >
              {num}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-editor-foreground font-code text-sm leading-6 resize-none border-none outline-none focus:ring-0"
            style={{ 
              tabSize: 2,
              fontFamily: 'Fira Code, monospace',
              lineHeight: '1.5'
            }}
            spellCheck={false}
          />

          {/* Code Highlights/Suggestions Overlay */}
          <div className="absolute inset-0 pointer-events-none p-4 font-code text-sm leading-6">
            {/* Performance issue highlight */}
            <div className="absolute left-4 top-[336px] right-4 h-6 bg-status-warning/10 border-l-2 border-status-warning rounded-r"></div>
            
            {/* Error highlight */}
            <div className="absolute left-4 top-[504px] right-4 h-6 bg-status-error/10 border-l-2 border-status-error rounded-r"></div>
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card text-xs font-body text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Lines: {lineNumbers.length}</span>
          <span>Language: TypeScript</span>
          <span>Encoding: UTF-8</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span>Line 14, Column 3</span>
          <span className="text-status-success">● Saved</span>
        </div>
      </div>
    </div>
  )
}