$(document).ready(function () {
    // Fetch memes on page load
    $.ajax({
        url: "https://api.imgflip.com/get_memes",
        method: "GET",
        success: function (response) {
            if (response.success) {
                displayMemes(response.data.memes);
            } else {
                alert("Failed to load memes");
            }
        },
    });

    // Function to display memes
    function displayMemes(memes) {
        const memeContainer = $("#meme-container");
        memes.forEach((meme) => {
            const memeItem = $(`
                <div class="meme-item" data-name="${meme.name}">
                    <div class="meme-name">${meme.name}</div>
                    <img src="${meme.url}" width="${meme.width}" height="${meme.height}" style="display: none;">
                </div>
            `);
            memeContainer.append(memeItem);
        });

        // Add click event to meme names to toggle visibility of the meme
        $(".meme-name").click(function () {
            $(this).siblings("img").toggle();
        });
    }

    // Search functionality
    $("#search").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();
        $(".meme-item").each(function () {
            const memeName = $(this).data("name").toLowerCase();
            if (memeName.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
