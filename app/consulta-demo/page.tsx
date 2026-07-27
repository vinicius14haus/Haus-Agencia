"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Download,
  FileSpreadsheet,
  Filter,
  Landmark,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";
import styles from "./page.module.css";

type Status = "aguardando" | "consultando" | "revisar" | "encontrado" | "sem resultado";

type Person = {
  name: string;
  cpf: string;
  status: Status;
  process?: string;
  tribunal?: string;
  transit?: string;
};

const initialPeople: Person[] = [
  { name: "Mariana Costa", cpf: "***.482.190-**", status: "encontrado", process: "0001234-21.2021.5.09.0007", tribunal: "TRT-9", transit: "18 mar. 2024" },
  { name: "Rafael Almeida", cpf: "***.915.832-**", status: "revisar", process: "0009876-40.2020.5.02.0031", tribunal: "TRT-2" },
  { name: "Ana Beatriz Lima", cpf: "***.210.734-**", status: "consultando" },
  { name: "Carlos Henrique", cpf: "***.653.091-**", status: "aguardando" },
  { name: "Fernanda Rocha", cpf: "***.070.448-**", status: "aguardando" },
  { name: "Lucas Martins", cpf: "***.321.809-**", status: "aguardando" },
  { name: "Joana Ribeiro", cpf: "***.106.577-**", status: "aguardando" },
];

const statusCopy: Record<Status, string> = {
  aguardando: "Aguardando",
  consultando: "Consultando",
  revisar: "Revisar",
  encontrado: "Encontrado",
  "sem resultado": "Sem resultado",
};

export default function ConsultaDemo() {
  const [people, setPeople] = useState(initialPeople);
  const [running, setRunning] = useState(true);
  const [filter, setFilter] = useState<"todos" | Status>("todos");
  const [notice, setNotice] = useState("Lote de demonstração em andamento");

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setPeople((current) => {
        const activeIndex = current.findIndex((person) => person.status === "consultando");
        const nextIndex = current.findIndex((person) => person.status === "aguardando");
        if (activeIndex === -1 || nextIndex === -1) return current;

        const resolved: Person = {
          ...current[activeIndex],
          status: activeIndex % 2 === 0 ? "encontrado" : "sem resultado",
          process: activeIndex % 2 === 0 ? "0004567-83.2022.5.15.0012" : undefined,
          tribunal: activeIndex % 2 === 0 ? "TRT-15" : undefined,
          transit: activeIndex % 2 === 0 ? "22 jan. 2025" : undefined,
        };
        const next = [...current];
        next[activeIndex] = resolved;
        next[nextIndex] = { ...next[nextIndex], status: "consultando" };
        return next;
      });
    }, 3400);

    return () => window.clearInterval(timer);
  }, [running]);

  const totals = useMemo(() => ({
    complete: people.filter((person) => ["encontrado", "revisar", "sem resultado"].includes(person.status)).length,
    found: people.filter((person) => person.status === "encontrado").length,
    review: people.filter((person) => person.status === "revisar").length,
  }), [people]);

  const visiblePeople = filter === "todos" ? people : people.filter((person) => person.status === filter);
  const progress = Math.round((totals.complete / people.length) * 100);

  const addDemoBatch = () => {
    const additions: Person[] = [
      { name: "Paulo César Souza", cpf: "***.490.216-**", status: "aguardando" },
      { name: "Camila Nogueira", cpf: "***.741.005-**", status: "aguardando" },
      { name: "Diego Barros", cpf: "***.838.620-**", status: "aguardando" },
    ];
    setPeople((current) => [...current, ...additions]);
    setNotice("3 CPFs de demonstração adicionados à fila");
  };

  const exportDemo = () => setNotice("Relatório de demonstração preparado para exportação");

  return (
    <main className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><Landmark size={21} /> JusConsulta <span>beta</span></div>
        <nav aria-label="Navegação principal" className={styles.nav}>
          <a className={styles.navActive} href="#painel"><Search size={18} /> Consultas</a>
          <a href="#resultados"><FileSpreadsheet size={18} /> Resultados</a>
          <a href="#revisao"><ShieldCheck size={18} /> Revisão jurídica</a>
        </nav>
        <div className={styles.sidebarNote}><ShieldCheck size={18} /><span>Dados exibidos nesta tela são fictícios e os CPFs estão mascarados.</span></div>
      </aside>

      <section className={styles.workspace} id="painel">
        <header className={styles.topbar}>
          <div><p>CONSULTA PROCESSUAL</p><h1>Lote 014 <span>•</span> Banco do Brasil</h1></div>
          <button className={styles.user} type="button" title="Conta da equipe">MT <ChevronDown size={16} /></button>
        </header>

        <section className={styles.overview} aria-label="Resumo do lote">
          <div className={styles.progressCard}>
            <div className={styles.cardHeading}><div><span className={styles.eyebrow}>PROCESSAMENTO</span><h2>{running ? "Consultando a fila" : "Consulta pausada"}</h2></div><Clock3 size={20} /></div>
            <div className={styles.progressLine}><span style={{ width: `${progress}%` }} /></div>
            <div className={styles.progressFooter}><strong>{totals.complete} de {people.length} concluídos</strong><span>{progress}%</span></div>
            <div className={styles.actionRow}>
              <button className={styles.primaryAction} type="button" onClick={() => setRunning((value) => !value)}>{running ? <Pause size={16} /> : <Play size={16} />}{running ? "Pausar lote" : "Retomar lote"}</button>
              <button className={styles.iconAction} type="button" onClick={addDemoBatch} title="Adicionar CPFs de demonstração"><Upload size={17} /></button>
            </div>
          </div>
          <div className={styles.metric}><span>Encontrados</span><strong>{totals.found}</strong><small>com processo vinculado</small></div>
          <div className={styles.metric}><span>Para revisão</span><strong>{totals.review}</strong><small>exigem confirmação jurídica</small></div>
          <div className={styles.metric}><span>Fonte prevista</span><strong>Jus.br</strong><small>consulta oficial assistida</small></div>
        </section>

        <section className={styles.mainGrid} id="resultados">
          <div className={styles.tablePanel}>
            <div className={styles.tableHeader}><div><h2>Fila de consultas</h2><p>{notice}</p></div><button className={styles.exportButton} type="button" onClick={exportDemo}><Download size={16} /> Exportar</button></div>
            <div className={styles.filters}>
              <label><Search size={16} /><input placeholder="Buscar pessoa ou CPF" aria-label="Buscar pessoa ou CPF" /></label>
              <div className={styles.filterButtons} aria-label="Filtrar resultado">
                {(["todos", "encontrado", "revisar", "consultando"] as const).map((item) => <button key={item} type="button" className={filter === item ? styles.filterActive : ""} onClick={() => setFilter(item)}>{item === "todos" ? "Todos" : statusCopy[item]}</button>)}
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Pessoa consultada</th><th>Resultado</th><th>Processo</th><th>Última evidência</th></tr></thead>
                <tbody>{visiblePeople.map((person) => <tr key={`${person.name}-${person.cpf}`}><td><strong>{person.name}</strong><span>{person.cpf}</span></td><td><StatusBadge status={person.status} /></td><td>{person.process ? <><strong className={styles.process}>{person.process}</strong><span>{person.tribunal}</span></> : <span className={styles.dash}>—</span>}</td><td>{person.transit ? <><strong>Trânsito em julgado</strong><span>{person.transit}</span></> : person.status === "revisar" ? <span className={styles.warningText}>Confirmar decisão</span> : <span className={styles.dash}>—</span>}</td></tr>)}</tbody>
              </table>
            </div>
          </div>

          <aside className={styles.reviewPanel} id="revisao">
            <div className={styles.reviewIcon}><CircleAlert size={22} /></div>
            <span className={styles.eyebrow}>REVISÃO JURÍDICA</span>
            <h2>O app não decide o caso sozinho.</h2>
            <p>Ele encontra, organiza e mostra as evidências. A regra de “favorável” e a confirmação do trânsito em julgado permanecem com a equipe jurídica.</p>
            <div className={styles.reviewSteps}><span><CheckCircle2 size={16} /> Processo e partes</span><span><CheckCircle2 size={16} /> Banco do Brasil como réu</span><span><CheckCircle2 size={16} /> Decisão e trânsito</span></div>
            <button type="button" onClick={() => setFilter("revisar")}><Filter size={16} /> Ver casos pendentes</button>
          </aside>
        </section>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const Icon = status === "encontrado" ? CheckCircle2 : status === "revisar" ? CircleAlert : status === "consultando" ? Clock3 : null;
  return <span className={`${styles.badge} ${styles[`badge_${status.replace(" ", "_")}`]}`}>{Icon && <Icon size={14} />}{statusCopy[status]}</span>;
}
