import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Zap, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Suggestion {
  id: string
  type: 'performance' | 'refactoring' | 'best-practice' | 'security'
  severity: 'critical' | 'moderate' | 'minor'
  title: string
  description: string
  lineNumber: number
  originalCode: string
  suggestedCode: string
  impact: string
  reasoning: string
  isExpanded?: boolean
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'performance',
    severity: 'critical',
    title: 'Remove infinite useEffect loop',
    description: 'The useEffect hook runs on every render because it lacks a dependency array, causing performance issues.',
    lineNumber: 11,
    originalCode: `useEffect(() => {
  fetchUserData();
});`,
    suggestedCode: `useEffect(() => {
  fetchUserData();
}, [userId]);`,
    impact: 'High - Prevents infinite re-renders and improves performance significantly',
    reasoning: 'Adding userId to the dependency array ensures the effect only runs when the userId changes.'
  },
  {
    id: '2',
    type: 'refactoring',
    severity: 'moderate',
    title: 'Consolidate early returns',
    description: 'Multiple early returns can be consolidated into a more maintainable structure.',
    lineNumber: 24,
    originalCode: `if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!user) return <div>No user found</div>;`,
    suggestedCode: `if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

if (!user) {
  return <EmptyState message="No user found" />;
}`,
    impact: 'Medium - Improves code maintainability and user experience',
    reasoning: 'Using dedicated components for different states makes the code more modular and easier to test.'
  },
  {
    id: '3',
    type: 'best-practice',
    severity: 'minor',
    title: 'Add PropTypes or TypeScript interface',
    description: 'Component props should be properly typed for better development experience.',
    lineNumber: 5,
    originalCode: `const UserProfile = ({ userId }) => {`,
    suggestedCode: `interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {`,
    impact: 'Low - Improves type safety and development experience',
    reasoning: 'Proper typing prevents runtime errors and improves IDE support.'
  }
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'text-perf-critical bg-perf-critical/10 border-perf-critical/20'
    case 'moderate':
      return 'text-perf-moderate bg-perf-moderate/10 border-perf-moderate/20'
    case 'minor':
      return 'text-perf-minor bg-perf-minor/10 border-perf-minor/20'
    default:
      return 'text-muted-foreground bg-muted border-border'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'performance':
      return <Zap className="h-4 w-4" />
    case 'refactoring':
      return <Trash2 className="h-4 w-4" />
    case 'best-practice':
      return <CheckCircle className="h-4 w-4" />
    case 'security':
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Lightbulb className="h-4 w-4" />
  }
}

interface SuggestionCardProps {
  suggestion: Suggestion
  onApply: (id: string) => void
  onDismiss: (id: string) => void
  onToggleExpand: (id: string) => void
}

function SuggestionCard({ suggestion, onApply, onDismiss, onToggleExpand }: SuggestionCardProps) {
  return (
    <div className="border border-suggestion-border rounded-lg bg-suggestion-background hover:bg-suggestion-hover transition-all duration-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              {getTypeIcon(suggestion.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-headline font-semibold text-foreground">{suggestion.title}</h4>
                <Badge variant="outline" className={cn("text-xs", getSeverityColor(suggestion.severity))}>
                  {suggestion.severity}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground font-body mb-2">{suggestion.description}</p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Line {suggestion.lineNumber}</span>
                <span>•</span>
                <span className="capitalize">{suggestion.type.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onToggleExpand(suggestion.id)}
          >
            {suggestion.isExpanded ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </Button>
        </div>

        {/* Expanded Content */}
        {suggestion.isExpanded && (
          <div className="space-y-4 border-t border-border pt-4">
            {/* Code Comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-headline font-medium text-muted-foreground mb-2">Current Code</h5>
                <div className="bg-editor-background border border-border rounded-md p-3">
                  <pre className="text-xs font-code text-editor-foreground overflow-x-auto">
                    {suggestion.originalCode}
                  </pre>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-headline font-medium text-muted-foreground mb-2">Suggested Code</h5>
                <div className="bg-editor-background border border-border rounded-md p-3">
                  <pre className="text-xs font-code text-editor-foreground overflow-x-auto">
                    {suggestion.suggestedCode}
                  </pre>
                </div>
              </div>
            </div>

            {/* Impact and Reasoning */}
            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-headline font-medium text-muted-foreground mb-1">Impact</h5>
                <p className="text-sm font-body text-foreground">{suggestion.impact}</p>
              </div>
              
              <div>
                <h5 className="text-xs font-headline font-medium text-muted-foreground mb-1">Reasoning</h5>
                <p className="text-sm font-body text-foreground">{suggestion.reasoning}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="h-3 w-3" />
              Helpful
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsDown className="h-3 w-3" />
              Not helpful
            </Button>
            <Button variant="ghost" size="sm">
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDismiss(suggestion.id)}
            >
              Dismiss
            </Button>
            <Button 
              variant="success" 
              size="sm"
              onClick={() => onApply(suggestion.id)}
              className="gap-2"
            >
              <CheckCircle className="h-3 w-3" />
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SuggestionsPanel() {
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [activeTab, setActiveTab] = useState('all')

  const handleApply = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
    // TODO: Apply the suggestion to the code editor
  }

  const handleDismiss = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }

  const handleToggleExpand = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, isExpanded: !s.isExpanded } : s
    ))
  }

  const filterSuggestions = (type: string) => {
    if (type === 'all') return suggestions
    return suggestions.filter(s => s.type === type)
  }

  const filteredSuggestions = filterSuggestions(activeTab)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-headline font-semibold text-foreground">AI Suggestions</h3>
          <Badge variant="outline" className="text-xs">
            {suggestions.length} total
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-8">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="refactoring" className="text-xs">Refactor</TabsTrigger>
            <TabsTrigger value="best-practice" className="text-xs">Best Practice</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onApply={handleApply}
              onDismiss={handleDismiss}
              onToggleExpand={handleToggleExpand}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h4 className="text-lg font-headline font-semibold text-foreground mb-2">No suggestions found</h4>
            <p className="text-sm text-muted-foreground font-body mb-4">
              {activeTab === 'all' 
                ? 'Your code looks great! No optimization opportunities detected.'
                : `No ${activeTab.replace('-', ' ')} suggestions available.`
              }
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Learn More
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}