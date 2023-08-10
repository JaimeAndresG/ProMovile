import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { HomePage } from './home.page';



//creación del archivo de pruebas con su título:
describe('Pruebas unitarias home', () => {

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
        HomePage
      ]
    }).compileComponents();
  });

  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido de Home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    
    let rut = app.perso.controls['rut'];
    let nom = app.perso.controls['nom'];
    let ape = app.perso.controls['ape'];
    let correo = app.perso.controls['correo'];
    let fecha_nac = app.perso.controls['fecha_nac'];
    let semestre = app.perso.controls['semestre'];
    let clave = app.perso.controls['clave'];
    let tipo_usuario = app.perso.controls['tipo_usuario'];

  

    
    rut.setValue('14852963-8');
    nom.setValue('y');
    ape.setValue('h');
    correo.setValue('jaime@gmail.com');
    fecha_nac.setValue('20/12/2012');
    semestre.setValue('10');
    clave.setValue('lacasacaga');
    tipo_usuario.setValue('alumnosos');

    
    expect(app.perso.invalid).toBeTrue();
  });
  
  it('3. Formulario válido de Home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    
    let rut = app.perso.controls['rut'];
    let nom = app.perso.controls['nom'];
    let ape = app.perso.controls['ape'];
    let correo = app.perso.controls['correo'];
    let fecha_nac = app.perso.controls['fecha_nac'];
    let semestre = app.perso.controls['semestre'];
    let clave = app.perso.controls['clave'];
    let tipo_usuario = app.perso.controls['tipo_usuario'];

    rut.setValue('19.220.838-6');
    nom.setValue('Jaime');
    ape.setValue('Gonzalez');
    correo.setValue('jaime@duocuc.cl');
    fecha_nac.setValue('20-05-1995');
    semestre.setValue('5');
    clave.setValue('jaime123');
    tipo_usuario.setValue('alumno');



    expect(app.perso.valid).toBeTrue();
  });
  
  it('4. Ejecutar un boton/método de home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    let rut = app.perso.controls['rut'];
    let nom = app.perso.controls['nom'];
    let ape = app.perso.controls['ape'];
    let correo = app.perso.controls['correo'];
    let fecha_nac = app.perso.controls['fecha_nac'];
    let semestre = app.perso.controls['semestre'];
    let clave = app.perso.controls['clave'];
    let tipo_usuario = app.perso.controls['tipo_usuario'];
    //let verificar_password = app.verificar_password = 'jaime123';

    rut.setValue('19.220.838-6');
    nom.setValue('Jaime');
    ape.setValue('Gonzalez');
    correo.setValue('jaime@duocuc.cl');
    fecha_nac.setValue('20-12-1990');
    semestre.setValue('5');
    clave.setValue('jaime123');
    tipo_usuario.setValue('alumno');
    

    app.agregarOtro();

    expect(app.v_agregar).toBeTrue();
  });

  it('5. largo del arreglo de home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    app.listarFire();

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  });


});
