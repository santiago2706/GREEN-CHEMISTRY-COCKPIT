# 🟢 Green Chemistry Cockpit: Guía de Usuario y Funcionamiento del Demo

Este documento detalla la ruta que sigue un usuario dentro de nuestra plataforma y explica detalladamente cómo funciona el sistema de demostración (Executive Demo) para presentaciones con stakeholders.

---

## 🚀 1. El Camino del Usuario (User Path)

La plataforma está diseñada para guiar al usuario desde una visión estratégica hasta la optimización técnica individual.

### Paso 1: Dashboard de Control (El Hub Central)
Al ingresar, el usuario llega al **Dashboard**. Este es su centro de comando.
- **Acción:** Selecciona el "Contexto Industrial" (Textil, Minería, etc.) para ajustar los parámetros de IA.
- **Visualización:** Observa el **Green Score** (puntuación de sostenibilidad) y el **Riesgo Regulatorio**.
- **Decisión:** Si el score es bajo o el riesgo es rojo, el usuario decide "Iniciar Rediseño".

### Paso 2: Centro de Procesos y Análisis (Reaction Lab)
Desde el dashboard, el usuario navega a **"Procesos"**.
- **Acción:** Define la mezcla química actual. Puede agregar componentes, ajustar temperatura y pH.
- **Visualización:** El "Motor de Análisis" calcula en tiempo real cómo cada cambio afecta el impacto ambiental.
- **Impacto:** Aquí es donde ocurre la magia de la **Sustitución Inteligente (Smart Swap)**.

### Paso 3: Optimización y Detalle Técnico
Si el usuario necesita profundizar, accede a **"Detalle Técnico"**.
- **Acción:** Revisa el desglose de los 12 Principios de la Química Verde aplicados a su mezcla.
- **Resultado:** Obtiene una lista de optimizaciones sugeridas (ej. reducción de energía o cambio de solventes).

### Paso 4: Reporte Ambiental y Cumplimiento
Finalmente, el usuario valida los resultados en las vistas de **"Impacto Ambiental"** y **"Cumplimiento"**.
- **Visualización:** Gráficos de CO2, Factor E (residuos) y estatus REACH/EPA.
- **Cierre:** Descarga el **Informe Técnico** en PDF para soporte de toma de decisiones.

---

## 🛠️ 2. Guía del Modo Demo (Executive Demo)

El **Modo Demo** es una herramienta diseñada para mostrar el potencial de la plataforma sin necesidad de configurar una planta real manualmente.

### ¿Cómo funciona la lógica del Demo?
El sistema utiliza el hook `useDemoState`, que gestiona una "memoria persistente" en el navegador para simular diferentes estados del negocio.

### Los 3 Escenarios Predefinidos:

| Escenario | Nombre | Impacto en el Cockpit | Propósito de Venta |
| :--- | :--- | :--- | :--- |
| **[ESC-01]** | **Estado Base** | Score: **42/100** (Riesgo Rojo) | Mostrar el "problema": Procesos tóxicos, altos residuos y falta de cumplimiento. |
| **[ESC-02]** | **Optimizado** | Score: **78/100** (Riesgo Amarillo) | Mostrar el "proceso": Cómo la IA sugiere cambios y mejora la sostenibilidad gradualmente. |
| **[ESC-03]** | **Cumplimiento** | Score: **92/100** (Riesgo Verde) | Mostrar la "solución": Un estado ideal preparado para auditorías internacionales (REACH/EPA). |

### Características Clave del Demo:
1.  **Reactividad Total:** Al cambiar de escenario en el panel de Demo, **toda la plataforma se actualiza instantáneamente**. Los gráficos en el Dashboard, los colores de riesgo y los mensajes de consejo cambian para reflejar el nuevo estado.
2.  **Notificaciones de Sistema:** Cada acción en el demo dispara notificaciones técnicas que refuerzan la narrativa de "Control Industrial".
3.  **Persistencia:** Si cierras la página y vuelves, el demo recordará en qué escenario te quedaste (ideal para presentaciones accidentadas).

---

## 💡 Conclusión: El Ciclo "Acción-Explicación-Resultado"

Nuestra plataforma no solo da datos; sigue un patrón estricto:
1.  **Acción:** El usuario (o el demo) cambia una variable.
2.  **Explicación:** La IA explica *por qué* esa variable es peligrosa o beneficiosa.
3.  **Resultado:** El Cockpit muestra el impacto directo en el score de sostenibilidad y rentabilidad legal.

*Documento generado para el equipo de desarrollo y ventas - 12 de Enero de 2026.*
