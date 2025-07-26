import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  MessageSquare, 
  Video, 
  ExternalLink, 
  HelpCircle,
  Zap,
  Code,
  Shield,
  Lightbulb
} from 'lucide-react'

const Help = () => {
  const faqs = [
    {
      question: "How does CRON analyze my code?",
      answer: "CRON uses advanced static analysis and machine learning models trained on best practices to identify optimization opportunities, performance bottlenecks, and code smells in your codebase."
    },
    {
      question: "Is my code sent to external servers?",
      answer: "By default, CRON processes your code locally for maximum privacy. You can optionally enable cloud processing for enhanced features, with end-to-end encryption."
    },
    {
      question: "Which programming languages are supported?",
      answer: "CRON currently supports TypeScript, JavaScript, Python, and Java, with more languages being added regularly."
    },
    {
      question: "How accurate are the suggestions?",
      answer: "Our AI models are trained on millions of code examples and best practices. While highly accurate, we recommend reviewing each suggestion before applying it to your codebase."
    }
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold text-foreground">Help & Support</h1>
        <p className="text-lg text-muted-foreground font-body">
          Get the most out of CRON with our comprehensive guides and support
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:scale-105 transition-transform cursor-pointer">
          <CardHeader className="text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg font-headline">Documentation</CardTitle>
            <CardDescription className="font-body">Complete user guide and API reference</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer">
          <CardHeader className="text-center">
            <Video className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg font-headline">Video Tutorials</CardTitle>
            <CardDescription className="font-body">Step-by-step video guides</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer">
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg font-headline">Community</CardTitle>
            <CardDescription className="font-body">Join our developer community</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Getting Started
          </CardTitle>
          <CardDescription className="font-body">
            New to CRON? Start here to set up your first analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-headline font-semibold flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                1. Connect Your IDE
              </h4>
              <p className="text-sm text-muted-foreground font-body">
                Install the CRON extension for VS Code or IntelliJ IDEA to enable real-time analysis.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Install Extension
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-headline font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                2. Run Your First Analysis
              </h4>
              <p className="text-sm text-muted-foreground font-body">
                Open a project and click "Analyze Code" to see optimization suggestions.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Quick Start Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-b-0">
              <h4 className="font-headline font-semibold text-foreground mb-2">{faq.question}</h4>
              <p className="text-sm text-muted-foreground font-body">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Options */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Need More Help?
          </CardTitle>
          <CardDescription className="font-body">
            Our support team is here to help you succeed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline font-semibold">Live Chat</h4>
                  <p className="text-sm text-muted-foreground font-body">Get instant help</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Start Chat
              </Button>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-headline font-semibold">Knowledge Base</h4>
                  <p className="text-sm text-muted-foreground font-body">Search our docs</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Browse Articles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;