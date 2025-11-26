import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  individualSum: number;
  status: "ok" | "divergent" | "not_found";
}

const mockCampaigns: Campaign[] = [
  {
    id: "CMP-2024-001",
    name: "Campanha Verão 2024",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    totalValue: 150000,
    individualSum: 150000,
    status: "ok",
  },
  {
    id: "CMP-2024-002",
    name: "Black Friday 2024",
    startDate: "2024-11-20",
    endDate: "2024-11-30",
    totalValue: 250000,
    individualSum: 248500,
    status: "divergent",
  },
  {
    id: "CMP-2024-003",
    name: "Natal Premium",
    startDate: "2024-12-01",
    endDate: "2024-12-25",
    totalValue: 180000,
    individualSum: 180000,
    status: "ok",
  },
];

export function CampaignTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Campaign>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredCampaigns = mockCampaigns
    .filter(campaign => {
      const matchesSearch = campaign.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aVal > bVal ? direction : -direction;
    });

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      ok: { label: "Válida", className: "bg-success text-success-foreground" },
      divergent: { label: "Divergente", className: "bg-warning text-warning-foreground" },
      not_found: { label: "Não Encontrada", className: "bg-destructive text-destructive-foreground" },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const SortIcon = ({ field }: { field: keyof Campaign }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID ou nome da campanha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="ok">Válidas</SelectItem>
            <SelectItem value="divergent">Divergentes</SelectItem>
            <SelectItem value="not_found">Não Encontradas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("id")}
                  className="font-medium"
                >
                  ID <SortIcon field="id" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className="font-medium"
                >
                  Nome <SortIcon field="name" />
                </Button>
              </TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">Soma Individual</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{new Date(campaign.startDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{new Date(campaign.endDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    {campaign.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.individualSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Nenhuma campanha encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
