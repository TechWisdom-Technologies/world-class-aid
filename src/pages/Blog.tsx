import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { blogPosts } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, BookOpen } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);

  const sorted = useMemo(() => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), []);
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
  const paged = rest.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Student Blog</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Student Life & Study Guides in Malaysia</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">Tips, guides, and stories from international students studying in Malaysia.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Featured Post */}
        {featured && (
          <Link to={`/blog/${featured.id}`} className="block group mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3">{featured.category}</Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                  </div>
                  <span className="text-sm font-semibold text-secondary flex items-center gap-1">
                    Read Full Article <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="h-48 overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="text-xs mb-2">{post.category}</Badge>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <span className="mt-3 text-xs font-semibold text-secondary flex items-center gap-1">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page <span className="font-semibold text-foreground">{currentPage}</span> of {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}
