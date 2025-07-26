import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-headline font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-headline font-semibold text-foreground">Page Not Found</h2>
          <p className="text-lg text-muted-foreground font-body max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="cron" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/help">
              Get Help
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
