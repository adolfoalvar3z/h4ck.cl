---
title: "DEPLOY_PROTOCOL: CÓMO CREAR POSTS Y SUBIRLOS A GITHUB"
date: "MAR 11, 2026"
category: "INTEL"
author: "SysAdmin_X"
tags: ["GitHub", "Markdown", "Git", "Deploy", "Tutorial"]
readTime: "8 MIN READ"
image: "/images/github-deploy-post.png"
summary: "Guía operativa completa para crear, estructurar y desplegar posts en Markdown en tu repositorio de GitHub. Desde el frontmatter hasta el push final — todo automatizado."
---

# DEPLOY_PROTOCOL: CÓMO CREAR POSTS Y SUBIRLOS A GITHUB

Guía operativa para agentes que necesitan publicar inteligencia rápidamente. Este protocolo cubre desde la creación del archivo Markdown hasta el despliegue en producción vía GitHub.

---

## FASE 1 — ESTRUCTURA DEL POST

Cada post es un archivo `.md` (Markdown) con dos secciones críticas:

### 1.1 Frontmatter (Metadatos)

El **frontmatter** es el bloque YAML al inicio del archivo, delimitado por `---`. Contiene toda la metadata que el sistema necesita para renderizar el post correctamente.

```yaml
---
title: "NOMBRE DEL POST"
date: "MAR 11, 2026"
category: "MALWARE ANALYSIS"
author: "Tu_Alias"
tags: ["Tag1", "Tag2", "Tag3"]
readTime: "10 MIN READ"
image: "https://images.unsplash.com/photo-xxx"
summary: "Descripción breve del contenido del post."
---
```

**Campos obligatorios:**

| Campo      | Descripción                                     | Ejemplo                        |
|------------|-------------------------------------------------|--------------------------------|
| `title`    | Título del post en MAYÚSCULAS                   | `"ANÁLISIS DE PAYLOAD"`        |
| `date`     | Fecha en formato `MMM DD, YYYY`                 | `"MAR 11, 2026"`               |
| `category` | Categoría del post                              | `"MALWARE ANALYSIS"`           |
| `author`   | Alias del autor                                 | `"Ghost_Zero"`                 |
| `tags`     | Array de etiquetas                              | `["Zero-Day", "Cloud"]`        |
| `readTime` | Tiempo estimado de lectura                      | `"12 MIN READ"`                |
| `image`    | URL de imagen de portada (Unsplash recomendado) | `"https://images.unsplash.com/..."` |
| `summary`  | Resumen breve (1-2 líneas)                      | `"Análisis del nuevo exploit..."` |

### 1.2 Contenido del Post

Después del frontmatter, escribe el contenido en **Markdown estándar**:

```markdown
# Título Principal

Párrafo de introducción con contexto del análisis.

## Sección 1: Reconocimiento

Descripción detallada del hallazgo...

### Subsección: Indicadores de Compromiso (IoC)
- **IP sospechosa**: `192.168.1.100`
- **Hash MD5**: `d41d8cd98f00b204e9800998ecf8427e`
- **Dominio C2**: `malicious-domain.xyz`

## Sección 2: Análisis Técnico

Incluye bloques de código cuando sea necesario:

```bash
# Ejemplo de comando
nmap -sV -sC -p- target.com
```

## Conclusiones

Resumen de hallazgos y recomendaciones.
```

---

## FASE 2 — CREAR EL ARCHIVO

### Opción A: Usando el Generador Web

1. Navega a `/generator` en el sitio
2. Completa los campos de **metadatos** en el panel izquierdo
3. Escribe el contenido en el **editor Markdown**
4. Usa la pestaña **PREVIEW** para verificar el renderizado
5. Haz clic en **DESCARGAR .MD** para obtener el archivo

### Opción B: Manualmente

Crea un archivo `.md` en la carpeta `src/content/blog/`:

```bash
# Crear el archivo
touch src/content/blog/mi-nuevo-post.md
```

**Convención de nombres:**
- Usa **kebab-case** (minúsculas con guiones): `mi-analisis-malware.md`
- El nombre del archivo se convierte en el **slug** de la URL: `/posts/mi-analisis-malware`
- Evita caracteres especiales, espacios y acentos en el nombre del archivo

---

## FASE 3 — SUBIR A GITHUB

### 3.1 Requisitos Previos

Asegúrate de tener:
- **Git** instalado (`git --version`)
- **Acceso SSH** o **HTTPS** configurado con GitHub
- El **repositorio clonado** localmente

### 3.2 Verificar Estado

```bash
# Ver archivos nuevos/modificados
git status
```

Deberías ver algo como:

```
Untracked files:
  src/content/blog/mi-nuevo-post.md
```

### 3.3 Agregar y Hacer Commit

```bash
# Agregar el post al staging
git add src/content/blog/mi-nuevo-post.md

# Si también agregaste imágenes
git add public/images/mi-imagen.png

# Crear el commit con mensaje descriptivo
git commit -m "feat(blog): add post - análisis de nuevo malware"
```

**Convención de commits recomendada:**
- `feat(blog): add post - título corto` → Nuevo post
- `fix(blog): update post - corrección en análisis` → Corrección
- `docs(blog): improve post - agregar IoCs` → Mejora de contenido

### 3.4 Push al Repositorio

```bash
# Subir al branch principal
git push origin main
```

### 3.5 Verificar el Deploy

Si tienes **CI/CD configurado** (Vercel, Netlify, GitHub Pages):
1. Ve a tu **dashboard** del servicio de hosting
2. Verifica que el **build** haya sido exitoso
3. Accede a la URL del post: `https://tu-sitio.com/posts/mi-nuevo-post`

---

## FASE 4 — FLUJO AUTOMATIZADO (AVANZADO)

### Script de Deploy Rápido

Crea un script `deploy.sh` para automatizar todo el proceso:

```bash
#!/bin/bash
# deploy.sh — Script de deploy rápido para posts

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}[*] DEPLOY_PROTOCOL INICIADO${NC}"

# Verificar cambios
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${RED}[!] No hay cambios para deployar${NC}"
    exit 1
fi

# Mostrar archivos modificados
echo -e "${GREEN}[+] Archivos modificados:${NC}"
git status --short

# Agregar todos los cambios
git add .

# Solicitar mensaje de commit
read -p "[>] Mensaje del commit: " MSG

# Commit y push
git commit -m "feat(blog): $MSG"
git push origin main

echo -e "${GREEN}[✓] DEPLOY EXITOSO — Post subido a GitHub${NC}"
```

### Uso:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## FASE 5 — TROUBLESHOOTING

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Build failed` | Frontmatter incorrecto | Verificar que todos los campos requeridos existan |
| `Invalid date` | Formato de fecha incorrecto | Usar formato `MMM DD, YYYY` |
| `Permission denied` | Sin acceso SSH | Configurar clave SSH en GitHub |
| `Merge conflict` | Cambios conflictivos | Resolver conflictos manualmente con `git merge` |
| `Post no aparece` | Slug duplicado | Verificar que el nombre del archivo sea único |

### Checklist Pre-Deploy

- [ ] Frontmatter completo con todos los campos
- [ ] Imagen de portada accesible (URL válida)
- [ ] Contenido revisado sin errores de formato
- [ ] Nombre del archivo en kebab-case
- [ ] Fecha actualizada
- [ ] Tags relevantes asignados

---

## CONCLUSIÓN

El flujo de publicación se resume en **3 pasos**:

1. **Crear** → Archivo `.md` con frontmatter + contenido
2. **Verificar** → Preview local antes de subir
3. **Deploy** → `git add` → `git commit` → `git push`

Mantén tus reportes de inteligencia actualizados. Cada minuto cuenta cuando se trata de compartir información crítica con la comunidad.

> **PROTOCOL_STATUS: OPERATIONAL** — Deploy pipeline listo para ejecución.
