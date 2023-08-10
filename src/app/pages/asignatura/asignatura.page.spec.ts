import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AsignaturaPage } from './asignatura.page';



//creación del archivo de pruebas con su título:
describe('Pruebas unitarias Asignatura', () => {

  //preparación de los elementos necesarios para hacer pruebas unitarias:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        IonicStorageModule.forRoot()
      ],
      declarations: [
        AsignaturaPage
      ]
    }).compileComponents();
  });

  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido de Asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;
    
    let cod_asignatura = app.asignatura.controls['cod_asignatura'];
    let nombre_asigna = app.asignatura.controls['nombre_asigna'];
    let sigla = app.asignatura.controls['sigla'];
    let escuela = app.asignatura.controls['escuela'];
    let rut_docente = app.asignatura.controls['rut_docente'];


   

    cod_asignatura.setValue('');
    nombre_asigna.setValue('123123123');
    sigla.setValue('123123123');
    escuela.setValue('123123');
    rut_docente.setValue('9529277-1');
    

    
    expect(app.asignatura.invalid).toBeTrue();
  });
  
  it('3. Formulario válido de Asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;
    
    let cod_asignatura = app.asignatura.controls['cod_asignatura'];
    let nombre_asigna = app.asignatura.controls['nombre_asigna'];
    let sigla = app.asignatura.controls['sigla'];
    let escuela = app.asignatura.controls['escuela'];
    let rut_docente = app.asignatura.controls['rut_docente'];


   

    cod_asignatura.setValue('1');
    nombre_asigna.setValue('Aplicacion Movil');
    sigla.setValue('PGY005D');
    escuela.setValue('Informatica');
    rut_docente.setValue('9.529.277-1');
    



    expect(app.asignatura.valid).toBeTrue();
  });
  
  it('4. Ejecutar un boton/método de asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;

    let cod_asignatura = app.asignatura.controls['cod_asignatura'];
    let nombre_asigna = app.asignatura.controls['nombre_asigna'];
    let sigla = app.asignatura.controls['sigla'];
    let escuela = app.asignatura.controls['escuela'];
    let rut_docente = app.asignatura.controls['rut_docente'];


   

    cod_asignatura.setValue('1');
    nombre_asigna.setValue('Aplicacion Movil');
    sigla.setValue('PGY005D');
    escuela.setValue('Informatica');
    rut_docente.setValue('9.529.277-1');
  
    

    app.agregarOtroAsig();

    expect(app.v_agregarAsig).toBeTrue();
  });

  it('5. largo del arreglo de asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;

    app.listarUsuarios();
    app.listarAsignatura();

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
    expect(app.asignaturas.length).toBeGreaterThanOrEqual(0);
  });


});

