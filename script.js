let cellsWidth = Number.parseInt($(".cells").css("width"));
let cellsHight = Number.parseInt($(".cells").css("height"));
let vert;
let hor;
const cards = [
	"0.png",
	"1.png",
	"2.png",
	"3.png",
	"4.png",
	"5.png",
	"6.png",
	"7.png",
	"8.png",
	"9.png",
	"10.png",
	"11.png",
];
let gameArray = [];
let count = 1;
let cardWidth;
let cardHeight;
let longGame;
let numTru = 0;
let score = Number($(".score-numb").text());

function getRandomArr(vert = 2, hor = 3) {
	let arr = [];
	let result = [];
	let numbArr = vert * hor;
	longGame = numbArr;

	for (let i = 0; i < numbArr / 2; i++) {
		arr.push(i);
		arr.push(i);
	}

	arr.sort(() => Math.random() - 0.5);

	for (let i = 0; i < vert; i++) {
		let a = [];

		for (let y = 0; y < hor; y++) {
			a.push(arr.shift());
		}

		result.push(a);
	}

	return result;
}

function gameConstruct(vert = 2, hor = 3) {
	let cells = $(".cells");
	let line = "<div class='line'></div>";
	let cell = "<div class='cell'></div>";
	let cardFront =
		"<div class='card front'><img src='screen.png' alt=''></div>";
	cardBack = `<div class='card backend'></div>`;

	cellsWidth = Number.parseInt($(".cells").css("width"));
	cardWidth = cellsWidth / (vert * 2);
	cardHeight = cellsWidth / (vert * 2);

	cells.empty();

	for (let i = 0; i < vert; i++) {
		let lineDiv = $(line);

		for (let y = 0; y < hor; y++) {
			const cellDiv = $(cell);
			const backDiv = $(cardBack);
			backDiv.append(`<img src='${cards[gameArray[i][y]]}' alt=''>`);
			cellDiv.append($(cardFront));
			cellDiv.append($(backDiv));

			lineDiv.append(cellDiv);
		}

		cells.append(lineDiv);
	}

	$(".cell").css("width", cardWidth + "px");
	$(".cell").css("height", cardHeight + "px");
}

function equal() {
	$(".first, .second").children(".backend").addClass("eqcell");
	$(".first, .second").children(".front").addClass("eqcell");

	setTimeout(function () {
		score++;
		$(".score-numb").text(score);
		$(".backend").css("transform", "scale(0)");
		$(".first, .second").children(".backend").addClass("eqcell");
		$(".first, .second").children(".front").addClass("eqcell");
	}, 400);
	$(".first").addClass("true");

	$(".second").addClass("true");
	$(".cell").removeClass("first");
	$(".cell").removeClass("second");
}

function diffCell() {
	setTimeout(function () {
		$(".first, .second").children(".backend").addClass("rotate");
	}, 300);
	setTimeout(function () {
		$(".first, .second").children(".backend").removeClass("animBack");
		$(".first, .second").children(".front").removeClass("animFront");
		$(".first, .second").children(".backend").addClass("endAnimBack");
		$(".first, .second").children(".front").addClass("endAnimFront");
	}, 600);
	setTimeout(function () {
		$(".first, .second")
			.children(".backend")
			.css(
				"transform",
				`rotateX(${Math.ceil(
					(Math.random() - 0.5) * 30
				)}deg) rotateY(180deg)`
			);
		$(".first, .second")
			.children(".front")
			.css(
				"transform",
				`rotate(${Math.ceil(
					(Math.random() - 0.5) * 30
				)}deg) rotateY(0deg)`
			);
		$(".first, .second")
			.children(".backend")
			.removeClass("rotate")
			.removeClass("endAnimBack");
		$(".first, .second").children(".front").removeClass("endAnimFront");
		$(".cell").removeClass("first");
		$(".cell").removeClass("second");
	}, 900);
}

function endGame() {
	$("#game").hide();
	$("#winner").css("display", "flex");
	$(".cell").removeClass("true");

	$(".score-numb").text(score);

	setTimeout(function () {
		$("#winner").css("display", "none");
		$("#menu").css("display", "flex");
	}, 2000);
}

function gameMenu() {
	$("#menu").css("display", "flex");
	$("#game").css("display", "none");
	$("#winner").css("display", "none");
	$(".cell").removeClass("true");
	numTru = 0;
}
function newGame() {
	score = 0;
	$(".score-numb").text(score);
	count = 0;

	$("#menu").css("display", "none");
	$("#game").css("display", "flex");
}

$(".return").click(function () {
	gameMenu();
});

$(".image-off").click(function (eventData) {
	vert = $(this).attr("rov");
	hor = $(this).attr("col");
	cellsWidth = Number.parseInt($(".cells").css("width"));
	gameArray = getRandomArr(vert, hor);

	newGame();

	gameConstruct(vert, hor);
});

$(".cells").on("click", ".cell", function (e) {
	const cell = e.currentTarget;
	let back = $(cell).children(".backend");
	let front = $(cell).children(".front");

	if (
		$(cell).hasClass("first") ||
		$(cell).hasClass("second") ||
		$(cell).hasClass("true")
	) {
		return false;
	} else {
		count++;

		$(back).addClass("animBack");
		$(front).addClass("animFront");
		$(back).css("transform", "rotateY(0deg)");
		$(front).css("transform", "rotateY(-180deg)");

		if (count % 2 !== 0) {
			$(cell).addClass("first");
		} else {
			$(cell).addClass("second");

			if ($(".first>.backend").html() === $(".second>.backend").html()) {
				setTimeout(function () {
					equal();
				}, 500);
				numTru += 2;
			} else {
				diffCell();
			}
		}
	}

	if (longGame === numTru) {
		numTru = 0;
		score = 0;

		setTimeout(function () {
			endGame();
		}, 1000);
	}
});
