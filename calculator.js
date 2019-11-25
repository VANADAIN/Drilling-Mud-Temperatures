function calculator() {


    // getter part

    let consumption = document.getElementById('consumption').value
    let Q = consumption

    let diameter = document.getElementById('diameter').value
    let D = diameter

    let depth = document.getElementById('depth').value
    let H = depth

    let outer_d = document.getElementById('outer_d').value
    let D1 = outer_d

    let inner_d = document.getElementById('inner_d').value
    let D2 = inner_d

    let hydro_shaggily = document.getElementById('hydro_shaggily').value
    let K = hydro_shaggily

    let connection_type = document.getElementById('connection').value
    let J = connection_type

    let channel_d = document.getElementById('channel_d').value
    let D3 = channel_d

    let length = document.getElementById('length').value
    let L = length

    let liquid_type = document.getElementById('liquid_type').value
    let J1 = liquid_type

    let density = document.getElementById('density').value
    let R = density

    let thermal_capacity = document.getElementById('thermal_capacity').value
    let C1 = thermal_capacity

    let thermal_conductivity = document.getElementById('thermal_conductivity').value
    let L1 = thermal_conductivity

    let temperature_rock = document.getElementById('temperature').value
    let T0 = temperature_rock

    let gradient = document.getElementById('gradient').value
    let S = gradient

    let bt = document.getElementById('bt').value
    let L0 = bt

    let start_temperature = document.getElementById('start_temperature').value
    let T1 = start_temperature

    let spending = document.getElementById('spending').value
    let N3 = spending

    let circulation = document.getElementById('circulation').value
    let T2 = circulation

    let depth_step = document.getElementById('depth_step').value
    let H1 = depth_step

    let frequency = document.getElementById('frequency').value
    let N1 = frequency

    //calculation part

    let Pi = 3.1415926

    // множитель для коэффициента борда и карно 
    if (J == 1) {
        let a = 2
    } else if (J == 2) {
        let a = 1.5
    } else if (J == 3) {
        let a = 0
    } else {
        let a = 0
    }

    //угловая скорость
    let U = Pi * D1 * (N1/60)

    console.log(U)
}