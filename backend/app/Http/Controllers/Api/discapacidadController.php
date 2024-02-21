<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\persona;

class DiscapacidadController extends Controller
{
    public function index()
    {
        $personasConDiscapacidad = persona::all();
        return response()->json($personasConDiscapacidad);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();

        $discapacidad = new persona;
        $discapacidad->nombre = $data['nombre'];
        $discapacidad->tipo = $data['tipo'];
        $discapacidad->edad = $data['edad'];
        $discapacidad->grado = $data['grado'];
        $discapacidad->fecha = $data['fecha'];
        $discapacidad->save();

        return response()->json($discapacidad, 201);
    }

    public function show($id)
    {
        $discapacidad = persona::find($id);

        return response()->json($discapacidad);
    }

    public function update(Request $request, $id)
    {
        $data = $request->json()->all();

        $discapacidad = persona::findOrFail($id);
        $discapacidad->nombre = $data['nombre'];
        $discapacidad->tipo = $data['tipo'];
        $discapacidad->edad = $data['edad'];
        $discapacidad->grado = $data['grado'];
        $discapacidad->fecha = $data['fecha'];
        $discapacidad->save();

        return response()->json($discapacidad);
    }

    public function destroy($id)
    {
        $discapacidad = persona::findOrFail($id);
        persona::destroy($id);

        return response()->json($discapacidad);
    }
}
