import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MenuSearchProps {
  items: any[];
  onFilter: (filtered: any[]) => void;
}

const MenuSearch = ({ items, onFilter }: MenuSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);

  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const dietaries = ["Vegetarian", "Non-Vegetarian"];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesDietary =
        !selectedDietary ||
        (selectedDietary === "Vegetarian" && item.vegetarian) ||
        (selectedDietary === "Non-Vegetarian" && !item.vegetarian);

      return matchesSearch && matchesCategory && matchesDietary;
    });
  }, [searchTerm, selectedCategory, selectedDietary, items]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDietary(null);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <p className="text-sm font-medium mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Dietary Filter */}
      <div>
        <p className="text-sm font-medium mb-2">Dietary</p>
        <div className="flex flex-wrap gap-2">
          {dietaries.map((diet) => (
            <Badge
              key={diet}
              onClick={() =>
                setSelectedDietary(selectedDietary === diet ? null : diet)
              }
              className={`cursor-pointer transition-all ${
                selectedDietary === diet
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {diet}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(searchTerm || selectedCategory !== "All" || selectedDietary) && (
        <button
          onClick={handleClearSearch}
          className="text-sm text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {items.length} items
      </p>
    </div>
  );
};

export default MenuSearch;
