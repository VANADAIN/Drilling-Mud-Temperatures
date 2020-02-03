var counter = 1;

function calculator() {
	// getter part

	console.log("start");

	const consumption = document.getElementById("consumption").value;
	const Q = Number(consumption);
	console.log(Q);

	const diameter = document.getElementById("diameter").value;
	const D = Number(diameter);
	console.log(D);

	const depth = document.getElementById("depth").value;
	const H = Number(depth);
	console.log(H);
	const outer_d = document.getElementById("outer_d").value;
	const D1 = Number(outer_d);
	console.log(D1);
	const inner_d = document.getElementById("inner_d").value;
	const D2 = Number(inner_d);
	console.log(D2);
	const hydro_shaggily = document.getElementById("hydro_shaggily").value;
	const K = Number(hydro_shaggily);
	console.log(K);
	const connection_type = document.getElementById("connection").value;
	const J = Number(connection_type);
	console.log(J);
	const channel_d = document.getElementById("channel_d").value;
	const D3 = Number(channel_d);
	console.log(D3);
	const length = document.getElementById("length").value;
	const L = Number(length);
	console.log(L);
	const liquid_type = document.getElementById("liquid_type").value;
	const J1 = Number(liquid_type);
	console.log(J1);
	const density = document.getElementById("density").value;
	const R = Number(density);
	console.log(R);
	const structural = document.getElementById("structural").value;
	const N = Number(structural);
	console.log(N);
	const dynamical = document.getElementById("dynamical").value;
	const T = Number(dynamical);
	console.log(T);
	const dynamical_2 = document.getElementById("dynamical_2").value;
	const M = Number(dynamical_2);
	console.log(M);
	console.log("Getting inputs");

	const ud_tepl = document.getElementById("ud_tepl").value;
	const C1 = Number(ud_tepl);
	console.log(C1);
	const kof_tepl = document.getElementById("kof_tepl").value;
	const L1 = Number(kof_tepl);
	console.log(L1);
	const rock_density = document.getElementById("rock_density").value;
	const R2 = Number(rock_density);
	console.log(R2);
	const thermal_capacity = document.getElementById("thermal_capacity").value;
	const C2 = Number(thermal_capacity);
	console.log(C2);
	const thermal_conductivity = document.getElementById("thermal_conductivity")
		.value;
	const L2 = Number(thermal_conductivity);
	console.log(L2);
	const temperature_rock = document.getElementById("temperature").value;
	const T0 = Number(temperature_rock);
	console.log(T0);
	const gradient = document.getElementById("gradient").value;
	const S = Number(gradient);
	console.log(S);
	const bt = document.getElementById("bt").value;
	const L0 = Number(bt);
	console.log(L0);
	const start_temperature = document.getElementById("start_temperature").value;
	const T1 = Number(start_temperature);
	console.log(T1);
	const spending = document.getElementById("spending").value;
	const N3 = Number(spending);
	console.log(N3);
	const circulation = document.getElementById("circulation").value;
	const T2 = Number(circulation);
	console.log(T2);
	const depth_step = document.getElementById("depth_step").value;
	const H1 = Number(depth_step);
	console.log(H1);
	const frequency = document.getElementById("frequency").value;
	const N1 = Number(frequency);
	console.log(N1);
	//calculation part

	const Pi = 3.1415926;

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
	console.log(J);
	//угловая скорость
	const U = Pi * D1 * (N1 / 60);
	// сечение внутри труб
	const F1 = (Pi * D2 ** 2) / 4;
	// Коэф борда и карно
	const E = a * ((D2 / D3) ** 2 - 1) ** 2;
	// Массовый расход
	const G = Q * (R / 60000);
	// сечение внутри кольца
	const F2 = (Pi * (D2 ** 2 - D1 ** 2)) / 4;

	console.log(U);
	console.log(F1);
	console.log(E);
	console.log(G);
	// Reynolds part

	// скорость потока
	const V = Q / (60000 * F1);

	// вязкость бингамовской жидкости
	const m = N + 0.17 * T * (D2 / V);
	console.log("v =" + V);
	console.log("D2 =" + D2);

	console.log("R/m =" + R / m);
	// reynolds
	const R1 = V * D2 * (R / m);
	// прандтль
	const P = m * (C1 / L1);

	console.log("checkpoint1");
	console.log(V);
	console.log(m);
	console.log(R1);
	console.log(P);

	// теплоотдача
	if (J == 1) {
		if (R1 > 2400) {
			var A0 = 0.021 * R1 ** 0.8 * P ** 0.43 * (L1 / D2);
		} else {
			var A0 = 0.15 * R1 ** 0.33 * P ** 0.43 * (L1 / D2);
		}
	} else {
		if (R1 > 2400) {
			var A0 = 0.023 * R1 ** 0.8 * P ** 0.43 * (L1 / D2);
		} else {
			var A0 = 0.12 * R1 ** 0.33 * P ** 0.43 * (L1 / D2);
		}
	}
	console.log(A0);
	// гидравлическое сопротивление

	if (J == 1) {
		var W = 0.1 * (1.46 * (K / D2) + 100 / R1) ** 0.25;
	} else {
		if (R1 > 2400) {
			var W = 0.0075 / R1 ** 0.125;
		} else if (R1 > 50000) {
			var W = 0.02;
		} else {
			var W = 64 / R1;
		}
	}
	console.log(W);
	// потери по длине
	const P1 = W * V ** 2 * R * (H / (2 * D2));
	// кол-во труб
	const N4 = H / L;
	// потери давления в соединениях
	const P2 = E * V ** 2 * R * (N4 / 2);
	// гидравлический уклон
	const I1 = (P1 + P2) / (9.81 * R * H);

	const D4 = D - D1;

	console.log(P1);
	console.log(P2);
	console.log(N4);
	console.log(D4);
	console.log("checkpoint2");

	//  lambda part

	if (J == 1) {
		var W1 = 0.3164 / R1 ** 0.25;
	} else {
		if (R1 <= 1200) {
			var W1 = 14.6 / R1 ** 0.9;
		} else {
			var W1 = 0.075 / R1 ** 0.125;
		}
	}
	console.log(W1);

	// потери в кольцевом пространстве
	const P3 = W1 * V ** 2 * R * 1.03 * (H / (2 * D4));
	// гидр уклон
	const I2 = P3 / (9.81 * R * 1.03 * H);

	// коэф теплопередачи через стенку трубы
	const log = Math.log(D1 / D2) / Math.log(10);
	const K1 = 1 / (1 / (A0 * D1) + 0.5 * (log / L0) + 1 / (A0 * D1));
	console.log(K1);
	// критерий био
	const B1 = A0 * (D / (2 * L2));
	// температуропроводность
	const A3 = L2 / (C2 * R2);
	// kryteri furie
	const F3 = A3 * T2 * (4 / D ** 2);
	// koef nestacionarnogo teploobmena
	const K2 = A0 / (1 + B1 * F3 ** 0.25);
	// pryrost t na zaboe
	const T3 = N3 / (G * C1);
	// koefs
	const X = K2 * (D / 2);
	const X1 = (K ** 2 * (D ** 2 / 4) + K2 * K1 * D) ** 0.5;
	const X2 = Pi / (G * C1);

	const X4 = K1 * X2;

	const R3 = X2 * (X + X1);
	const R4 = X2 * (X - X1);

	const A4 = (1 / X4) * (S - 9.81 * (T1 / C1));
	const B = (9.81 * G * (I1 + I2)) / (K2 * Pi * D);

	console.log(K2);
	console.log(X1);
	console.log("R3*h = " + R3 * H);
	console.log("R3 = " + R3);
	console.log("R4*h = " + R4 * H);
	console.log("R4 = " + R4);

	const X5 = R3 * 2.718 ** (R3 * H) - R4 * 2.718 ** (R4 * H);
	const X6 = T1 - T0 + A4 - B;

	console.log(X5);

	const M1 = -(X6 * R4 * 2.718 ** (R4 * H) + X4 * (A4 - T3)) / X5;
	const M2 = (X6 * R3 * 2.718 ** (R4 * H) + X4 * (A4 - T3) * (R3 / R4)) / X5;

	const Q1 = (X6 * R3 * 2.718 ** (R3 * H) + X4 * (A4 - T3)) / X5;
	const Q2 = -(X6 * R4 * 2.718 ** (R3 * H) + X4 * (A4 - T3) * (R4 / R3)) / X5;

	console.log("checkpoint");
	console.log(M1);
	console.log(M2);

	console.log(R3);
	console.log(Q2);
	console.log(B);
	console.log(A4);
	console.log(T0);

	console.log("calculating temps");
	console.log(M1);
	console.log(R3);
	console.log(Q1);
	console.log(R4);
	console.log(A4);
	console.log(B);
	console.log(T0);

	//final temperatures
	const T4 = ["T4"];
	const T5 = ["T5"];
	const T6 = ["Gradient"];
	const Heights = ["H"];

	for (let i = 0; i <= H; i = i + H1) {
		const t4 =
			M1 * 2.718 ** (R3 * i) + Q1 * 2.718 ** (R4 * i) - A4 + B + T0 + S * i;
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

	console.log(T4);
	console.log(T5);
	console.log(T6);

	// table part
	var TTT = [];
	TTT.push(T4);
	TTT.push(T5);
	TTT.push(T6);
	TTT.push(Heights);

	var div = document.querySelector("#div");
	var table = document.createElement("table");
	var p = document.createElement("p");

	for (let k = 0; k < TTT.length; k++) {
		var tr = document.createElement("tr");

		for (let j = 0; j < TTT[k].length; j++) {
			var td = document.createElement("td");
			td.innerHTML = TTT[k][j];

			tr.appendChild(td);
		}

		p.innerHTML = counter;

		table.appendChild(tr);
		div.appendChild(p);
		div.appendChild(table);
	}
	counter = counter + 1;
}
