<?php

namespace Database\Seeders;

use App\Models\persona;
use Illuminate\Database\Seeder;

class DiscapacidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $persona1 = new persona;
        $persona1->nombre = "Juan Pérez";
        $persona1->tipo = "Física";
        $persona1->edad = 30;
        $persona1->grado = "Moderada";
        $persona1->fecha = "2022-02-19";
        $persona1->timestamps = false;
        $persona1->save();
        
        $persona2 = new persona;
        $persona2->nombre = "Ana Rodríguez";
        $persona2->tipo = "Visual";
        $persona2->edad = 25;
        $persona2->grado = "Severa";
        $persona2->fecha = "2022-02-20";
        $persona2->timestamps = false;
        $persona2->save();
        
        $persona3 = new persona;
        $persona3->nombre = "Carlos Gómez";
        $persona3->tipo = "Auditiva";
        $persona3->edad = 35;
        $persona3->grado = "Leve";
        $persona3->fecha = "2022-02-21";
        $persona3->timestamps = false;
        $persona3->save();
        
        $persona4 = new persona;
        $persona4->nombre = "María López";
        $persona4->tipo = "Intelectual";
        $persona4->edad = 28;
        $persona4->grado = "Moderada";
        $persona4->fecha = "2022-02-22";
        $persona4->timestamps = false;
        $persona4->save();
        
        $persona5 = new persona;
        $persona5->nombre = "Pedro Martínez";
        $persona5->tipo = "Múltiple";
        $persona5->edad = 40;
        $persona5->grado = "Severa";
        $persona5->fecha = "2022-02-23";
        $persona5->timestamps = false;
        $persona5->save();
        
    }
}
