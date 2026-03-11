

## Analysis: Document vs Current Questions (Q23-Q30)

I compared the uploaded document "Respuesta_Consultas_Adicionales_Demo_Unicomer_26Feb26.docx" against the current Section G questions. Here are the gaps to fill:

### Mapping & Key Differences

| Doc Question | Current Q# | Key Missing Content |
|---|---|---|
| Q1 (Tarjetas) | Q30 | Revolving credit architecture: "Línea Madre" + "Créditos Específicos", 7 real-time formulas, tarjetas de crédito quoted separately |
| Q2a (Instancias) | Q23 | Azure dedicated subscription mention, cleaner option descriptions from doc |
| Q2b (APR/Flat) | Q24 | Rule of 78 as additional method, independent amortization tables per credit |
| Q3 (Fees) | Q25 | 3-step process (catalog → product → credit), waiver/condonación capability, specific example table with IVA columns |
| Q4 (Fixed Install.) | Q26 | Configurable periodicity (monthly/biweekly/weekly), 3 recalculation triggers (rate review, extraordinary payments, returns), specific $1000 example |
| Q5.1-5.3 (Scoring) | Q27 | CMM calculation methods (4 types), LEM configuration (3 types), regulatory classification categories (Normal→Irrecuperable) |
| Q5.4 (Usage) | Q28 | Specific usage table by area (Campaigns/Loyalty/Collections/Interest) from doc |
| Q5 (Interest rules) | Q29 | Minor enrichment only |

### Plan of Changes in `src/data/questions.ts`

1. **Q30 (Tarjetas)** — Enrich `respuesta` with Línea Madre architecture, 7 formulas, and clarification that tarjetas de crédito is quoted separately. Add `diagrams` with revolving credit 2-layer architecture flow.

2. **Q23 (Instancias)** — Update `respuesta` to include Azure dedicated subscription detail and multi-tenant segregation mention from doc.

3. **Q24 (APR/Flat)** — Add Rule of 78 to supported methods, mention independent amortization tables.

4. **Q25 (Fees)** — Restructure `respuesta` around the 3-step process from doc. Add condonación/waiver capability. Update example with IVA breakdown. Add amortization column detail.

5. **Q26 (Fixed Installments)** — Add configurable periodicity, 3 recalculation triggers (adjustable rate, extraordinary payments, returns/restructures). Update example with $1,000 at 24% APR numbers from doc.

6. **Q27 (Scoring)** — Enrich with CMM 4 calculation methods, LEM 3 configuration types, regulatory classification categories (Normal, Subnormal, Deficiente, Dudoso, Irrecuperable). Add diagrams for CMM and LEM.

7. **Q28 (Usage)** — Add the specific usage table from doc section 5.4 (Campaigns/Loyalty/Collections/Interest) as a `table` diagram. Add periodic update detail (monthly batch KPIs).

8. **All changes** applied in ES, EN, FR consistently.

### Technical Details

- All edits in a single file: `src/data/questions.ts`
- No new components needed — uses existing diagram types (`table`, `flow`, `grid`, `list`)
- No new dependencies
- Estimated: ~8 question objects updated with enriched text and new diagram blocks

