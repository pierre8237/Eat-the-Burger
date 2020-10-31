$(document).ready(function () {
  $(".create-form").on("sumbit", function (event) {
    event.preventDefault();
    const newBurger = {
      burger_name: $("#newishBurger").val().trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      method: "POST",
      data: newBurger
    }).then(function () {
      location.reload();
    });
  });

  $(".eatBurger").on("click", function (event) {
    event.preventDefault();
    const id = $(this).data("id");
    const burgerEaten = {
      devoured: 1
    };
    $.ajax("/burgers/" + id, {
      method: "PUT",
      data: burgerEaten
    }).then(function () {
      location.reload()();
    });
  });

  $(".devourBurger").on("click", function (event) {
    event.preventDefault();
    const id = $(this).data("id");
    const burgerEaten = {
      devoured: 1
    };
    $.ajax("/api/burgers/" + id, {
      method: "DELETE",
      data: burgerEaten
    }).then(function () {
      location.reload()();
    });
  });
});
