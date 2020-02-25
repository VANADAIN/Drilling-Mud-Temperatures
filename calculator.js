var counter = 1;

function calculator() {
	// getter part

	const consumption = document.getElementById("consumption").value;
	const Q = Number(consumption);

	const diameter = document.getElementById("diameter").value;
	const D = Number(diameter);

	const depth = document.getElementById("depth").value;
	const H = Number(depth);

	const outer_d = document.getElementById("outer_d").value;
	const D1 = Number(outer_d);

	const inner_d = document.getElementById("inner_d").value;
	const D2 = Number(inner_d);

	const hydro_shaggily = document.getElementById("hydro_shaggily").value;
	const K = Number(hydro_shaggily);

	const connection_type = document.getElementById("connection").value;
	const J = Number(connection_type);

	const channel_d = document.getElementById("channel_d").value;
	const D3 = Number(channel_d);

	const length = document.getElementById("length").value;
	const L = Number(length);

	const liquid_type = document.getElementById("liquid_type").value;
	const J1 = Number(liquid_type);

	const density = document.getElementById("density").value;
	const R = Number(density);

	const structural = document.getElementById("structural").value;
	const N = Number(structural);

	const dynamical = document.getElementById("dynamical").value;
	const T = Number(dynamical);

	const ud_tepl = document.getElementById("ud_tepl").value;
	const C1 = Number(ud_tepl);

	const kof_tepl = document.getElementById("kof_tepl").value;
	const L1 = Number(kof_tepl);

	const rock_density = document.getElementById("rock_density").value;
	const R2 = Number(rock_density);

	const thermal_capacity = document.getElementById("thermal_capacity").value;
	const C2 = Number(thermal_capacity);

	const thermal_conductivity = document.getElementById("thermal_conductivity")
		.value;
	const L2 = Number(thermal_conductivity);

	const temperature_rock = document.getElementById("temperature").value;
	const T0 = Number(temperature_rock);

	const gradient = document.getElementById("gradient").value;
	const S = Number(gradient);

	const bt = document.getElementById("bt").value;
	const L0 = Number(bt);

	const start_temperature = document.getElementById("start_temperature").value;
	const T1 = Number(start_temperature);

	const spending = document.getElementById("spending").value;
	const N3 = Number(spending);

	const circulation = document.getElementById("circulation").value;
	const T2 = Number(circulation);

	const depth_step = document.getElementById("depth_step").value;
	const H1 = Number(depth_step);

	const frequency = document.getElementById("frequency").value;
	const N1 = Number(frequency);

	//calculation part

	const Pi = 3.1415926;

	// угловая скорость
	const U = Pi * D1 * (N1 / 60);

	// множитель для коэффициента борда и карно
	if (J == 1) {
		var a = 2;
	} else if (J == 2) {
		var a = 1.5;
	} else if (J == 3) {
		var a = 0;
	} else {
		var a = 0;
	}

	// сечение внутри труб
	const F1 = (Pi * D2 ** 2) / 4;
	// Коэф борда и карно
	const E = a * (((D2 / D3) ** 2) - 1) ** 2;
	// Массовый расход
	const G = Q * (R / 60000);
	// сечение внутри кольца
	const F2 = (Pi * ((D ** 2) - (D1 ** 2))) / 4;

	// * Reynolds part N1

	// скорость потока
	const V = Q / (60000 * F1);

	// вязкость бингамовской жидкости
	const m = N + 0.17 * T * (D2 / V);

	// reynolds
	const R1 = V * D2 * (R / m);
	// прандтль
	const P = m * (C1 / L1);

	// теплоотдача
	if (J == 1) {
		if (R1 > 2400) {
			var A0 = 0.021 * (R1 ** 0.8) * (P ** 0.43) * (L1 / D2);
		} else {
			var A0 = 0.15 * (R1 ** 0.33) * (P ** 0.43) * (L1 / D2);
		}
	} else {
		if (R1 > 2400) {
			var A0 = 0.023 * (R1 ** 0.8) * (P ** 0.43) * (L1 / D2);
		} else {
			var A0 = 0.12 * (R1 ** 0.33) * (P ** 0.43) * (L1 / D2);
		}
	}

	// гидравлическое сопротивление

	if (J1 == 1) {
		var W = 0.1 * (1.46 * (K / D2) + 100 / R1) ** 0.25;
	} else {
		if (R1 >= 2400) {
			var W = 0.075 / (R1 ** 0.125);
		} else if (R1 > 50000) {
			var W = 0.02;
		} else {
			var W = 64 / R1;
		}
	}

	// потери по длине
	const P1 = W * (V ** 2) * R * (H / (2 * D2));
	// кол-во труб
	const N4 = H / L;
	// потери давления в соединениях
	const P2 = E * (V ** 2) * R * (N4 / 2);
	// гидравлический уклон
	const I1 = (P1 + P2) / (9.81 * R * H);

	const D4 = D - D1;

	// !Reynolds part N2 

	// скорость потока
	const V_sec = Q / (60000 * F2);

	// вязкость бингамовской жидкости
	const m_sec = N + 0.17 * T * (D4 / V_sec);

	// reynolds
	const R1_sec = V_sec * D4 * (R / m_sec);
	// прандтль
	const P_sec = m_sec * (C1 / L1);

	// теплоотдача
	if (J == 1) {
		if (R1_sec > 2400) {
			var A0_sec = 0.021 * (R1_sec ** 0.8) * (P_sec ** 0.43) * (L1 / D4);
		} else {
			var A0_sec = 0.15 * (R1_sec ** 0.33) * (P_sec ** 0.43) * (L1 / D4);
		}
	} else {
		if (R1 > 2400) {
			var A0_sec = 0.023 * (R1_sec ** 0.8) * (P_sec ** 0.43) * (L1 / D4);
		} else {
			var A0_sec = 0.12 * (R1_sec ** 0.33) * (P_sec ** 0.43) * (L1 / D4);
		}
	}

	//  lambda part

	if (J == 1) {
		var W1 = 0.3164 / (R1_sec ** 0.25);
	} else {
		if (R1_sec <= 1200) {
			// var W1 = (9 ** (-0.2)) * (((K / D4) + (68 / R1_sec)) ** 0.25) * (1 + (0.45 * (U / V_sec) ** 2) ** 0.5)
			var W1 = 14.6 / (R1_sec ** 0.9);
		} else {
			var W1 = 0.075 / (R1_sec ** 0.125);
		}
	}

	// потери в кольцевом пространстве
	const P3 = W1 * (V_sec ** 2) * R * 1.03 * (H / (2 * D4));
	// гидр уклон
	const I2 = P3 / (9.81 * R * 1.03 * H);

	// коэф теплопередачи через стенку трубы
	const log = Math.log(D1 / D2) / Math.log(10);
	const K1 = 1 / (1 / (A0 * D2) + 0.5 * (log / L0) + 1 / (A0_sec * D1));

	// критерий био
	const B1 = A0_sec * (D / (2 * L2));
	// температуропроводность
	const A3 = L2 / (C2 * R2);
	// kryteri furie
	const F3 = A3 * T2 * (4 / (D ** 2));
	// koef nestacionarnogo teploobmena
	const K2 = A0_sec / (1 + B1 * F3 ** 0.25);
	// pryrost t na zaboe
	const T3 = N3 / (G * C1);
	// koefs
	const X = K2 * (D / 2);
	const X1 = (((K ** 2) * (D ** 2)) / 4 + K2 * K1 * D) ** 0.5;
	const X2 = Pi / (G * C1);

	const X4 = K1 * X2;

	const R3 = X2 * (X + X1);
	const R4 = X2 * (X - X1);

	const A4 = (1 / X4) * (S - 9.81 * (T1 / C1));
	const B = (9.81 * G * (I1 + I2)) / (K2 * Pi * D);
	const X5 = R3 * 2.718 ** (R3 * H) - R4 * 2.718 ** (R4 * H);
	const X6 = T1 - T0 + A4 - B;

	const M1 = -(X6 * R4 * 2.718 ** (R4 * H) + X4 * (A4 - T3)) / X5;
	const M2 = (X6 * R3 * 2.718 ** (R4 * H) + X4 * (A4 - T3) * (R3 / R4)) / X5;

	const Q1 = (X6 * R3 * 2.718 ** (R3 * H) + X4 * (A4 - T3)) / X5;
	const Q2 = -(X6 * R4 * 2.718 ** (R3 * H) + X4 * (A4 - T3) * (R4 / R3)) / X5;

	//final temperatures
	const T4 = ["T4"];
	const T5 = ["T5"];
	const T6 = ["Gradient"];
	const Heights = ["Heights"];

	for (let i = 0; i <= H; i = i + H1) {
		const t4 =
			M1 * (2.718 ** (R3 * i)) + Q1 * (2.718 ** (R4 * i)) - A4 + B + T0 + S * i;
		const tf4 = t4.toFixed(2);
		T4.push(tf4);

		const t5 = M2 * 2.718 ** (R3 * i) + Q2 * 2.718 ** (R4 * i) + B + T0 + S * i;
		const tf5 = t5.toFixed(2);
		T5.push(tf5);

		const t6 = T0 + S * i;
		const tf6 = t6.toFixed(2);
		T6.push(tf6);

		Heights.push(i);
	}

	let sum = 0;
	T4.shift();
	for (i = 0; i < T4.length; i++) {
		sum = sum + Number(T4[i]);
	}
	let average = sum / T4.length;
	k_agr = 1 + (1.4 * 100) / ((C2) * average)

	const X_new = (k_agr * K2 * D) / 2;
	const X1_new = ((((k_agr ** 2) * (K ** 2) * (D ** 2)) / 4) + K2 * K1 * D) ** 0.5;
	const X2_new = Pi / (G * C1);

	const X4_new = K1 * X2;

	const R3_new = X2_new * (X_new + X1_new);
	const R4_new = X2_new * (X_new - X1_new);

	const A4_new = (1 / X4_new) * (S - 9.81 * (T1 / C1));
	const B_new = (9.81 * G * (I1 + I2)) / (K2 * Pi * D);

	const X5_new =
		R3_new * 2.718 ** (R3_new * H) - R4_new * 2.718 ** (R4_new * H);
	const X6_new = T1 - T0 + A4_new - B_new;

	const M1_new =
		-(X6_new * R4_new * 2.718 ** (R4_new * H) + X4_new * (A4_new - T3)) /
		X5_new;
	const M2_new =
		(X6_new * R3_new * 2.718 ** (R4_new * H) +
			X4_new * (A4_new - T3) * (R3_new / R4_new)) /
		X5_new;

	const Q1_new =
		(X6_new * R3_new * 2.718 ** (R3_new * H) + X4_new * (A4_new - T3)) / X5_new;
	const Q2_new =
		-(
			X6_new * R4_new * 2.718 ** (R3_new * H) +
			X4_new * (A4_new - T3) * (R4_new / R3_new)
		) / X5_new;


	var T4_new = ["T4"];
	var T5_new = ["T5"];
	const T6_new = ["Gradient"];
	var Heights_new = ["Heights"];

	for (let i = 0; i <= H; i = i + H1) {
		const t4_new =
			M1_new * 2.718 ** (R3_new * i) +
			Q1_new * 2.718 ** (R4_new * i) -
			A4_new +
			B_new +
			T0 +
			S * i;
		const tf4_new = t4_new.toFixed(2);
		T4_new.push(tf4_new);

		const t5_new =
			M2_new * 2.718 ** (R3_new * i) +
			Q2_new * 2.718 ** (R4_new * i) +
			B_new +
			T0 +
			S * i;
		const tf5_new = t5_new.toFixed(2);
		T5_new.push(tf5_new);

		const t6_new = T0 + S * i;
		const tf6_new = t6_new.toFixed(2);
		T6_new.push(tf6_new);

		Heights_new.push(i);
	}

	var TTT_new = [];
	TTT_new.push(T4_new);
	TTT_new.push(T5_new);
	TTT_new.push(T6_new);
	TTT_new.push(Heights_new);

	// rendering table
	table(TTT_new, Heights_new, T4_new, T5_new)
}

function table(arr, hei, four, five) {
	var div = document.querySelector("#div");
	var table = document.createElement("table");
	var p = document.createElement("p");
	var canvas = document.createElement("canvas");
	var str_counter = counter.toString()
	canvas.id = 'line-chart' + str_counter
	canvas.setAttribute("width", "800")
	canvas.setAttribute("height", "450")

	for (let k = 0; k < arr.length; k++) {
		var tr = document.createElement("tr");

		for (let j = 0; j < arr[k].length; j++) {
			var td = document.createElement("td");
			td.innerHTML = arr[k][j];

			tr.appendChild(td);
		}

		p.innerHTML = counter;
		table.appendChild(tr);
		div.appendChild(p);
		div.appendChild(table);
	}


	div.appendChild(canvas);

	//rendering chart
	chart(hei, four, five, str_counter)

	counter = counter + 1;
}


function chart(one, sec, th, number) {
	one.shift()
	sec.shift()
	th.shift()
	var heights_chart = one
	var down_temps_chart = sec
	var up_temps_chart = th

	new Chart(document.getElementById("line-chart" + number), {
		type: 'line',
		data: {
			// heights
			labels: heights_chart,
			datasets: [{
				data: down_temps_chart,
				label: "Температура внутри бурильной колонны",
				borderColor: "#3e95cd",
				fill: false
			}, {
				data: up_temps_chart,
				label: "Температура кольцевого пространства",
				borderColor: "#8e5ea2",
				fill: false
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Распределение температур раствора в скважине заданной глубины'
			}
		}
	});
}


// ? использовать calculator для промежуточного результата 
//  на каждом шаге (текущая глубина) получаем массив с температурами по трубе и массив по кольцу
// массивы с температурами добавляем в итоговый массив =>
// получаем двойной массив с температурами (кольца / трубы) для каждой конечной
// глубины (т.к разные темп в зависимости от глубины)
// например [ [температуры для 20м], [температуры для 40м] ]
// при этом температуры одной и той же точки для 20м и 40м скважины различны
// берем координату точки которая нас интересует 
// перебираем внутренние массивы, где глубина точки = индекс массива
// индекс считаем по шагу (для 200м при 5м шаге = 200/5 = 40 шаг => 39 элемент, тк индекс 1 эл-та = 0)
// * если элемента не существует = пропускаем шаг ?
// если элемент существует => записываем индекс в доп.массив точки 
// массив точки содержит температуры точки в различное время углубления
// изображаем изменение темп во времени 
// при t=0 до t-конеч => график не из начала

function point() {

	const mech_speed = 10
	var res_point_height = 200
	var full_circulation_time = mech_speed * H

	const consumption = document.getElementById("consumption").value;
	const Q = Number(consumption);

	const diameter = document.getElementById("diameter").value;
	const D = Number(diameter);

	const depth = document.getElementById("depth").value;
	const H = Number(depth);

	const depth_step = document.getElementById("depth_step").value;
	const H1 = Number(depth_step);

	const outer_d = document.getElementById("outer_d").value;
	const D1 = Number(outer_d);

	const inner_d = document.getElementById("inner_d").value;
	const D2 = Number(inner_d);

	const hydro_shaggily = document.getElementById("hydro_shaggily").value;
	const K = Number(hydro_shaggily);

	const connection_type = document.getElementById("connection").value;
	const J = Number(connection_type);

	const channel_d = document.getElementById("channel_d").value;
	const D3 = Number(channel_d);

	const length = document.getElementById("length").value;
	const L = Number(length);

	const liquid_type = document.getElementById("liquid_type").value;
	const J1 = Number(liquid_type);

	const density = document.getElementById("density").value;
	const R = Number(density);

	const structural = document.getElementById("structural").value;
	const N = Number(structural);

	const dynamical = document.getElementById("dynamical").value;
	const T = Number(dynamical);

	const ud_tepl = document.getElementById("ud_tepl").value;
	const C1 = Number(ud_tepl);

	const kof_tepl = document.getElementById("kof_tepl").value;
	const L1 = Number(kof_tepl);

	const rock_density = document.getElementById("rock_density").value;
	const R2 = Number(rock_density);

	const thermal_capacity = document.getElementById("thermal_capacity").value;
	const C2 = Number(thermal_capacity);

	const thermal_conductivity = document.getElementById("thermal_conductivity")
		.value;
	const L2 = Number(thermal_conductivity);

	const temperature_rock = document.getElementById("temperature").value;
	const T0 = Number(temperature_rock);

	const gradient = document.getElementById("gradient").value;
	const S = Number(gradient);

	const bt = document.getElementById("bt").value;
	const L0 = Number(bt);

	const start_temperature = document.getElementById("start_temperature").value;
	const T1 = Number(start_temperature);

	const spending = document.getElementById("spending").value;
	const N3 = Number(spending);

	const circulation = document.getElementById("circulation").value;
	const T2 = Number(circulation);

	const frequency = document.getElementById("frequency").value;
	const N1 = Number(frequency);

	// step from input for point


	// ! массивы для точки
	const total_up = []
	const total_down = []

	// повторяем код калькулятора в цикле с параметрами точки 
	for (let dynamical_h = 0; dynamical_h <= H; dynamical_h += mech_speed) {

		const Pi = 3.1415926;

		if (J == 1) {
			var a = 2;
		} else if (J == 2) {
			var a = 1.5;
		} else if (J == 3) {
			var a = 0;
		} else {
			var a = 0;
		}
		const F1 = (Pi * D2 ** 2) / 4;
		const E = a * (((D2 / D3) ** 2) - 1) ** 2;
		const G = Q * (R / 60000);
		const F2 = (Pi * ((D ** 2) - (D1 ** 2))) / 4;

		const V = Q / (60000 * F1);

		const m = N + 0.17 * T * (D2 / V);

		const R1 = V * D2 * (R / m);

		const P = m * (C1 / L1);

		if (J == 1) {
			if (R1 > 2400) {
				var A0 = 0.021 * (R1 ** 0.8) * (P ** 0.43) * (L1 / D2);
			} else {
				var A0 = 0.15 * (R1 ** 0.33) * (P ** 0.43) * (L1 / D2);
			}
		} else {
			if (R1 > 2400) {
				var A0 = 0.023 * (R1 ** 0.8) * (P ** 0.43) * (L1 / D2);
			} else {
				var A0 = 0.12 * (R1 ** 0.33) * (P ** 0.43) * (L1 / D2);
			}
		}

		if (J1 == 1) {
			var W = 0.1 * (1.46 * (K / D2) + 100 / R1) ** 0.25;
		} else {
			if (R1 >= 2400) {
				var W = 0.075 / (R1 ** 0.125);
			} else if (R1 > 50000) {
				var W = 0.02;
			} else {
				var W = 64 / R1;
			}
		}

		const P1 = W * (V ** 2) * R * (dynamical_h / (2 * D2));

		const N4 = dynamical_h / L;

		const P2 = E * (V ** 2) * R * (N4 / 2);

		const I1 = (P1 + P2) / (9.81 * R * dynamical_h);

		const D4 = D - D1;

		const V_sec = Q / (60000 * F2);

		const m_sec = N + 0.17 * T * (D4 / V_sec);

		const R1_sec = V_sec * D4 * (R / m_sec);

		const P_sec = m_sec * (C1 / L1);

		if (J == 1) {
			if (R1_sec > 2400) {
				var A0_sec = 0.021 * (R1_sec ** 0.8) * (P_sec ** 0.43) * (L1 / D4);
			} else {
				var A0_sec = 0.15 * (R1_sec ** 0.33) * (P_sec ** 0.43) * (L1 / D4);
			}
		} else {
			if (R1 > 2400) {
				var A0_sec = 0.023 * (R1_sec ** 0.8) * (P_sec ** 0.43) * (L1 / D4);
			} else {
				var A0_sec = 0.12 * (R1_sec ** 0.33) * (P_sec ** 0.43) * (L1 / D4);
			}
		}

		if (J == 1) {
			var W1 = 0.3164 / (R1_sec ** 0.25);
		} else {
			if (R1_sec <= 1200) {
				var W1 = 14.6 / (R1_sec ** 0.9);
			} else {
				var W1 = 0.075 / (R1_sec ** 0.125);
			}
		}

		const P3 = W1 * (V_sec ** 2) * R * 1.03 * (dynamical_h / (2 * D4));

		const I2 = P3 / (9.81 * R * 1.03 * dynamical_h);

		const log = Math.log(D1 / D2) / Math.log(10);
		const K1 = 1 / (1 / (A0 * D2) + 0.5 * (log / L0) + 1 / (A0_sec * D1));

		const B1 = A0_sec * (D / (2 * L2));

		const A3 = L2 / (C2 * R2);

		const F3 = A3 * T2 * (4 / (D ** 2));

		const K2 = A0_sec / (1 + B1 * F3 ** 0.25);

		const T3 = N3 / (G * C1);

		const X = K2 * (D / 2);
		const X1 = (((K ** 2) * (D ** 2)) / 4 + K2 * K1 * D) ** 0.5;
		const X2 = Pi / (G * C1);

		const X4 = K1 * X2;

		const R3 = X2 * (X + X1);
		const R4 = X2 * (X - X1);

		const A4 = (1 / X4) * (S - 9.81 * (T1 / C1));
		const B = (9.81 * G * (I1 + I2)) / (K2 * Pi * D);
		const X5 = R3 * 2.718 ** (R3 * dynamical_h) - R4 * 2.718 ** (R4 * dynamical_h);
		const X6 = T1 - T0 + A4 - B;

		const M1 = -(X6 * R4 * 2.718 ** (R4 * dynamical_h) + X4 * (A4 - T3)) / X5;
		const M2 = (X6 * R3 * 2.718 ** (R4 * dynamical_h) + X4 * (A4 - T3) * (R3 / R4)) / X5;

		const Q1 = (X6 * R3 * 2.718 ** (R3 * dynamical_h) + X4 * (A4 - T3)) / X5;
		const Q2 = -(X6 * R4 * 2.718 ** (R3 * dynamical_h) + X4 * (A4 - T3) * (R4 / R3)) / X5;

		const T4 = ["T4"];
		const T5 = ["T5"];
		const T6 = ["Gradient"];
		const Heights = ["Heights"];

		for (let i = 0; i <= dynamical_h; i = i + H1) {
			const t4 =
				M1 * (2.718 ** (R3 * i)) + Q1 * (2.718 ** (R4 * i)) - A4 + B + T0 + S * i;
			const tf4 = t4.toFixed(2);
			T4.push(tf4);

			const t5 = M2 * 2.718 ** (R3 * i) + Q2 * 2.718 ** (R4 * i) + B + T0 + S * i;
			const tf5 = t5.toFixed(2);
			T5.push(tf5);

			const t6 = T0 + S * i;
			const tf6 = t6.toFixed(2);
			T6.push(tf6);

			Heights.push(i);
		}

		let sum = 0;
		T4.shift();
		for (i = 0; i < T4.length; i++) {
			sum = sum + Number(T4[i]);
		}
		let average = sum / T4.length;
		k_agr = 1 + (1.4 * 100) / ((C2) * average)

		const X_new = (k_agr * K2 * D) / 2;
		const X1_new = ((((k_agr ** 2) * (K ** 2) * (D ** 2)) / 4) + K2 * K1 * D) ** 0.5;
		const X2_new = Pi / (G * C1);

		const X4_new = K1 * X2;

		const R3_new = X2_new * (X_new + X1_new);
		const R4_new = X2_new * (X_new - X1_new);

		const A4_new = (1 / X4_new) * (S - 9.81 * (T1 / C1));
		const B_new = (9.81 * G * (I1 + I2)) / (K2 * Pi * D);

		const X5_new =
			R3_new * 2.718 ** (R3_new * dynamical_h) - R4_new * 2.718 ** (R4_new * dynamical_h);
		const X6_new = T1 - T0 + A4_new - B_new;

		const M1_new =
			-(X6_new * R4_new * 2.718 ** (R4_new * dynamical_h) + X4_new * (A4_new - T3)) /
			X5_new;
		const M2_new =
			(X6_new * R3_new * 2.718 ** (R4_new * dynamical_h) +
				X4_new * (A4_new - T3) * (R3_new / R4_new)) /
			X5_new;

		const Q1_new =
			(X6_new * R3_new * 2.718 ** (R3_new * dynamical_h) + X4_new * (A4_new - T3)) / X5_new;
		const Q2_new =
			-(
				X6_new * R4_new * 2.718 ** (R3_new * dynamical_h) +
				X4_new * (A4_new - T3) * (R4_new / R3_new)
			) / X5_new;


		var T4_new = ["T4"];
		var T5_new = ["T5"];
		const T6_new = ["Gradient"];
		var Heights_new = ["Heights"];

		for (let i = 0; i <= dynamical_h; i = i + H1) {
			const t4_new =
				M1_new * 2.718 ** (R3_new * i) +
				Q1_new * 2.718 ** (R4_new * i) -
				A4_new +
				B_new +
				T0 +
				S * i;
			const tf4_new = t4_new.toFixed(2);
			T4_new.push(tf4_new);

			const t5_new =
				M2_new * 2.718 ** (R3_new * i) +
				Q2_new * 2.718 ** (R4_new * i) +
				B_new +
				T0 +
				S * i;
			const tf5_new = t5_new.toFixed(2);
			T5_new.push(tf5_new);

			const t6_new = T0 + S * i;
			const tf6_new = t6_new.toFixed(2);
			T6_new.push(tf6_new);

			Heights_new.push(i);
		}

		total_down.push(T4_new);
		total_up.push(T5_new);

	}

	// количество внутренних массивов = количество умещения скоростей в глубину скважины (в ч.)
	// get point values from total array

	const point_t_down = []
	const point_t_up = []


	// на каждой из глубин получаем индекс статической глубины точки
	var index = ((res_point_height / H1).toFixed())

	for (let j = 0; j < total_down.length; j++) {
		if (total_down[j][index]) {
			point_t_down.push(total_down[j][index])
		}
	}

	for (let j = 0; j < total_up.length; j++) {
		if (total_up[j][index]) {
			point_t_up.push(total_up[j][index])
		}
	}


}

// function point_chart() {

// }

