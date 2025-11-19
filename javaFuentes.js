document.addEventListener('DOMContentLoaded', function() {
    // 1. Elementos del DOM (Login)
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('login-container');
    const loginError = document.getElementById('login-error');

    // 2. Elementos del DOM (Dashboard)
    const mainInterface = document.getElementById('main-interface');
    const userNameDisplay = document.getElementById('user-name');
    const promedioValor = document.getElementById('promedio-valor');
    const semestreValor = document.getElementById('semestre-valor');
    const notasAsistenciasBtn = document.getElementById('notas-asistencias-btn');

    // 3. Elementos del DOM (Notas y Asistencias Interface)
    const notasAsistenciasInterface = document.getElementById('notas-asistencias-interface');
    const userNameDisplayNotas = document.getElementById('user-name-notas');
    const breadcrumbStudentName = document.getElementById('breadcrumb-student-name');
    const gradesTableBody = document.querySelector('.grades-table tbody');
    const backToDashboardLinks = document.querySelectorAll('.back-to-dashboard');

    // 4. Credenciales y Datos Específicos
    const validUser = "02250062011";
    const validPass = "Udes2202";
    const studentName = "SEBASTIAN CAMILO FUENTES TRIANA";
    
    // NOTA: En JS usamos punto para decimales (4.22), pero lo mostramos con coma.
    const studentPromedio = "4,22"; 
    const studentSemestre = "1";

    // Función auxiliar para generar notas aleatorias (punto decimal)
    function getRandomGrade(min, max) {
        // Genera un número aleatorio y lo redondea a un decimal.
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    // Datos de las materias actualizados (usando punto decimal en los valores fijos)
    const materias = [
        { grupo: "02215-A", nombre: "ADMINISTRACION GENERAL", semestre: 1, creditos: 3, p1: 4.1, p2: 4.4, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "16171-Q", nombre: "MATEMATICAS I", semestre: 1, creditos: 3, p1: 4.3, p2: 3.9, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "23011-A", nombre: "SOCIOANTROPOLOGIA", semestre: 1, creditos: 2, p1: 4.3, p2: 3.7, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "32321-B", nombre: "TEORIA Y HERMENEUTICA DE LAS FINANZAS", semestre: 1, creditos: 3, p1: 3.8, p2: 4.3, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "41103-A", nombre: "DESARROLLO DEL ESPIRITU EMPRENDEDOR I", semestre: 1, creditos: 2, p1: 4.3, p2: 4.0, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "15201-B", nombre: "INFORMATICA I", semestre: 0, creditos: 0, p1: 3.8, p2: 3.6, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "45679-B", nombre: "IDENTIDAD UDES", semestre: 0, creditos: 0, p1: 5.0, p2: 4.6, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
        { grupo: "18231-B", nombre: "INGLES I", semestre: 0, creditos: 0, p1: 4.5, p2: 3.5, examen: getRandomGrade(4, 5), acumulado: getRandomGrade(3.8, 4.6) },
    ];

    // 5. Funciones de Manejo de Interfaz
    
    // Función para mostrar la interfaz principal (Dashboard) e inyectar datos
    const showMainInterface = () => {
        loginContainer.classList.add('hidden');
        notasAsistenciasInterface.classList.add('hidden'); // Oculta la tercera interfaz
        mainInterface.classList.remove('hidden');
        
        if (userNameDisplay) userNameDisplay.textContent = studentName;
        if (promedioValor) promedioValor.textContent = studentPromedio;
        if (semestreValor) semestreValor.textContent = studentSemestre;
    };

    // Función para mostrar la interfaz de Notas y Asistencias
    const showNotasInterface = () => {
        mainInterface.classList.add('hidden');
        loginContainer.classList.add('hidden');
        notasAsistenciasInterface.classList.remove('hidden');

        // Inyecta el nombre en la barra superior y el breadcrumb
        if (userNameDisplayNotas) userNameDisplayNotas.textContent = studentName;
        if (breadcrumbStudentName) breadcrumbStudentName.textContent = studentName;

        // Genera el contenido de la tabla
        renderGradesTable();
    };

    // Función para renderizar la tabla de notas
    const renderGradesTable = () => {
        gradesTableBody.innerHTML = ''; // Limpiar contenido anterior
        
        materias.forEach(materia => {
            // Conversión para mostrar la nota con coma (formato local)
            const p1Display = materia.p1.toFixed(1).replace('.', ',');
            const p2Display = materia.p2.toFixed(1).replace('.', ',');
            const examenDisplay = String(materia.examen).replace('.', ',');
            const acumuladoDisplay = String(materia.acumulado).replace('.', ',');

            // Conversión para cálculo (punto flotante)
            const acumuladoFloat = parseFloat(materia.acumulado);
            
            // Determinar la nota final y su estilo
            let defFinalDisplay;
            let finalClass = 'aprobado'; 

            if (acumuladoFloat >= 3.0) {
                defFinalDisplay = acumuladoDisplay;
            } else {
                // Asumiendo que si el acumulado es menor a 3.0, podría ser Falla.
                // Aunque en este caso los datos están entre 3.8 y 4.6, manteniendo la estructura.
                defFinalDisplay = "Falla";
                finalClass = 'fail'; 
            }

            const row = gradesTableBody.insertRow();
            
            row.innerHTML = `
                <td>${materia.grupo}</td>
                <td><a href="#">${materia.nombre}</a></td>
                <td>${materia.semestre}</td>
                <td>${materia.creditos}</td>
                <td class="text-center">0 <span class="inasistencia-dot"></span></td>
                <td class="text-center">${p1Display}</td>
                <td class="text-center">${p2Display}</td>
                <td class="text-center">${examenDisplay}</td>
                <td class="text-center">${acumuladoDisplay}</td>
                <td class="text-center">--</td>
                <td class="text-center def-final ${finalClass}">${defFinalDisplay}</td>
            `;
        });
    };


    // 6. Manejadores de Eventos
    
    // Manejador del evento de envío del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const usuarioInput = document.getElementById('usuario').value.trim();
            const passwordInput = document.getElementById('password').value.trim();

            if (usuarioInput === validUser && passwordInput === validPass) {
                if (loginError) loginError.textContent = ''; 
                showMainInterface(); 
            } else {
                if (loginError) {
                    loginError.textContent = 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
                } else {
                    alert('Usuario o contraseña incorrectos.');
                }
                document.getElementById('password').value = '';
            }
        });
    }

    // Manejador del evento de clic en "Notas y Asistencias"
    if (notasAsistenciasBtn) {
        notasAsistenciasBtn.addEventListener('click', showNotasInterface);
    }

    // Manejador de los enlaces "Volver al Dashboard" (Inicio en breadcrumb y nav)
    backToDashboardLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showMainInterface();
        });
    });

    // Asegurarse que el enlace 'Trámites Académicos' en el nav de notas también funcione
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
    dashboardNavLinks.forEach(link => {
        if (link.textContent.includes('Trámites Académicos')) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                showMainInterface();
            });
        }
    });

});