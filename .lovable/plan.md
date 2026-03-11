

## Plan: Corregir texto de 655B

El texto actual separa "655B USD en activos" del subtexto "gestionados a través de SYSDE Pensión". El usuario quiere que quede claro que los 655B son activos manejados mediante SYSDE.

### Cambio
En `src/components/landing/SysdeStats.tsx`:
- Línea 52: Cambiar `"en activos"` / `"in assets"` → `"en activos gestionados"` / `"in managed assets"`
- Líneas 56-60: Actualizar el subtexto a `"a través de SYSDE en toda Latinoamérica"` / `"through SYSDE across Latin America"` para que fluya mejor con el label del stat.

