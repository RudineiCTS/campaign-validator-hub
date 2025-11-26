import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ValidationPanel() {
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [month, setMonth] = useState("");

  const handleValidation = () => {
    if (!mainFile || !selectedFile || !month) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos antes de validar.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    setProgress(0);
    setLogs([]);

    const logMessages = [
      "Iniciando validação...",
      "Carregando planilha principal...",
      "Carregando campanhas selecionadas...",
      "Validando parâmetros...",
      "Verificando regras de negócio...",
      "Comparando valores...",
      "Identificando divergências...",
      "Consultando base SQL...",
      "Gerando relatório...",
      "Validação concluída!",
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[currentLog]]);
        setProgress(((currentLog + 1) / logMessages.length) * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsValidating(false);
        toast({
          title: "Validação concluída",
          description: "O processo foi finalizado com sucesso.",
        });
      }
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Executar Validação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="main-file">Planilha Principal</Label>
            <div className="flex gap-2">
              <Input
                id="main-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setMainFile(e.target.files?.[0] || null)}
                disabled={isValidating}
              />
              <Button variant="outline" size="icon" disabled={isValidating}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="selected-file">Campanhas Selecionadas</Label>
            <div className="flex gap-2">
              <Input
                id="selected-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                disabled={isValidating}
              />
              <Button variant="outline" size="icon" disabled={isValidating}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="month">Mês de Referência</Label>
          <div className="flex gap-2">
            <Calendar className="h-4 w-4 mt-3 text-muted-foreground" />
            <Input
              id="month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              disabled={isValidating}
              className="flex-1"
            />
          </div>
        </div>

        <Button
          onClick={handleValidation}
          disabled={isValidating}
          className="w-full"
          size="lg"
        >
          <Play className="h-4 w-4 mr-2" />
          {isValidating ? "Validando..." : "Validar Agora"}
        </Button>

        {isValidating && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="rounded-lg border bg-muted/50 p-4 space-y-1 max-h-48 overflow-y-auto">
              <p className="text-sm font-medium mb-2">Logs de Execução:</p>
              {logs.map((log, index) => (
                <p key={index} className="text-sm text-muted-foreground font-mono">
                  [{new Date().toLocaleTimeString()}] {log}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
