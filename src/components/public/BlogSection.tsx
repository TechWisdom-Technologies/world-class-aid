import { Link } from "react-router-dom";
import { blogPosts } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

export function BlogSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Latest Articles</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Stay updated with tips, guides, and news for international students
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.slice(0, 4).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="h-40 overflow-hidden">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="text-xs mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString()}
                    </p>
                    <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/blog">
            <span className="text-sm font-semibold text-secondary hover:underline inline-flex items-center gap-1">
              View All Articles <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}