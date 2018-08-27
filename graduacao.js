// copiando os dados da tag `disciplina` para o objeto `disciplina`
var Disciplina = function (node) {
	var that = this;
	this.id = node.id;
	[].forEach.call(node.childNodes, function (child, indice) {
		if (child.nodeType == 1) {
			that[child.nodeName] = child.textContent;
		}
	});
}

// criando um link para um XML. 
var xml = document.getElementById("xml").innerHTML;
var url = URL.createObjectURL(new Blob([xml], {
	type: "application/xml"
}));
var tbody = document.querySelector("tbody");

// lendo um XML por AJAX.
var httpRequest = new XMLHttpRequest();
httpRequest.open("GET", url, true)
httpRequest.addEventListener("readystatechange", function () {
	if (httpRequest.readyState == 4) {
		var catalog = httpRequest.responseXML.getElementsByTagName("semestre")[0];
		var disciplina = catalog.getElementsByTagName("disciplina");
		[].forEach.call(disciplina, function (node, indice) {
			var disciplina = new Disciplina(node);
			var linha = document.createElement("tr");
			for (var indice = 0; indice < 7; indice++) {
				var celula = document.createElement("td");
				linha.appendChild(celula);
			}

			linha.dataset.id = disciplina.id;
			linha.children[0].textContent = disciplina.disciplinas;
			linha.children[1].textContent = disciplina.codigo;
			linha.children[2].textContent = disciplina.creditos;
			linha.children[3].textContent = disciplina.professor;
			linha.children[4].textContent = disciplina.sala;
			linha.children[5].textContent = disciplina.requisito;
			linha.children[6].textContent = disciplina.descricao;

			tbody.appendChild(linha);
		});
	}
});
httpRequest.send();