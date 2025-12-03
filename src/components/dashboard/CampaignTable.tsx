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
import { CampaignRow, IPharmaCampign } from "@/interfaces/TypeCampaign";

interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  individualSum: number;
  status: "Aberto"  ;
}

interface DTOCampaingTable{
  data:IPharmaCampign[]
}

export function CampaignTable({data}:DTOCampaingTable) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Campaign>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredCampaigns = data 
    .filter(campaign => {
      const search = searchTerm.toLowerCase();
      console.log(data)
      const matchesSearch =
        search === "" ||
        campaign.idCampanha === Number(searchTerm) ||
        campaign.campanha?.toLowerCase().includes(search);

      return matchesSearch;
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
      ok: { label: "Aberto", className: "bg-success text-success-foreground" },
      divergent: { label: "Fechado", className: "bg-warning text-warning-foreground" },
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

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-max">
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
                  Campanha <SortIcon field="name" />
                </Button>
              </TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Data Fim</TableHead>
              <TableHead >Calculo</TableHead>
              <TableHead >Apuração</TableHead>
              <TableHead >Objetivo</TableHead>
              <TableHead >Meta</TableHead>
              <TableHead >Ranking</TableHead>
              <TableHead >Valor</TableHead>
              <TableHead >Premição Total</TableHead>
              <TableHead >Recebimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.idCampanha}>
                  <TableCell className="font-medium">{campaign.idCampanha}</TableCell>
                  <TableCell>{campaign.campanha}</TableCell>
                  <TableCell>{new Date(campaign.dataInicio).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{new Date(campaign.dataFim).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{campaign.calculo}</TableCell>
                  <TableCell>{campaign.apuracao}</TableCell>
                  <TableCell className="text-right">
                    {campaign.objetivo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  {/* <TableCell>{campaign.objetivo}</TableCell> */}
                  <TableCell>{campaign.meta}</TableCell>
                  <TableCell>{campaign.ranking}</TableCell>
                  <TableCell>{campaign.valor}</TableCell>
                  {/* <TableCell>{campaign.premiacaoTotal}</TableCell> */}
                  <TableCell className="text-right">
                    {campaign.premiacaoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>{campaign.recebimentoPremiacao}</TableCell>
                  {/* <TableCell>{getStatusBadge(campaign.situacao)}</TableCell> */}
                  
                  {/* <TableCell className="text-right">
                    {campaign.individualSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell> */}
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
