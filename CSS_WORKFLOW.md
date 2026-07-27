# CSS workflow — Haus

Este projeto usa Tailwind/PostCSS com o stylesheet global em `app/globals.css`.

## Regras obrigatórias

1. Antes de editar CSS, verificar se existe mais de uma instância de `next dev` ou `next start` deste projeto. Manter apenas uma instância ativa.
2. Não fazer substituições automáticas amplas em `app/globals.css`. Editar um bloco por vez e preservar a ordem das camadas.
3. Depois de qualquer alteração visual, rodar `npm.cmd run build`. Um build verde é obrigatório, mas não substitui a validação visual.
4. Validar a página em uma aba nova ou após recarregar sem cache. Confirmar que o CSS foi carregado: tipografia, layout, cores e navegação precisam estar presentes.
5. Se a página aparecer como HTML sem estilo, parar de editar componentes. Encerrar os processos duplicados, remover apenas o cache `.next` do projeto, iniciar um único `npm.cmd run dev` e validar novamente.
6. Nunca entregar com a página em estado “unstyled”. Se a prévia não puder ser validada, informar o bloqueio.

## Recuperação de CSS/cache

No PowerShell, a sequência segura é:

```powershell
# 1. Identifique processos Next deste projeto e encerre somente os duplicados.
Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
  Where-Object { $_.CommandLine -match 'HausAgencia\\haus' -and $_.CommandLine -match 'next|npm' } |
  Select-Object ProcessId, CommandLine

# 2. Depois de confirmar os PIDs, encerre-os explicitamente.
Stop-Process -Id <PID_1>,<PID_2> -Force

# 3. Preserve o cache antigo antes de reconstruir.
Move-Item -LiteralPath .next -Destination .next-recovery-<timestamp>

# 4. Rode somente uma instância.
npm.cmd run dev
```

Não apagar `.next` de forma recursiva sem antes conferir o diretório atual. O cache é regenerável, mas deve ser movido para permitir recuperação durante a investigação.

## Checklist antes de entregar

- [ ] `npm.cmd run build` terminou sem erro.
- [ ] Existe apenas uma instância do servidor local do projeto.
- [ ] A página foi recarregada após a alteração.
- [ ] A prévia mostra layout, fontes, cores, imagens e responsividade.
- [ ] Não há erro de CSS no console do navegador.
- [ ] O diff contém somente as alterações intencionais.
