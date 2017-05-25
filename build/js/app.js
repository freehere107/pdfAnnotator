jQuery(document).ready(function ($) {
    // Existing tags for the user.
    // Ideally it should come from the server
    var tags = [
        "revision",
        "group study",
        "assignment",
        "later",
        "exam"
    ];

    var defaultAnnotations = [];

    var annotations = (function () {
        if (window.localStorage) {
            var annotations = JSON.parse(localStorage.getItem("annotations"));

            if (!annotations || annotations.length === 0) {
                window.localStorage.setItem("annotations", JSON.stringify(defaultAnnotations));
                return defaultAnnotations;
            }
            return annotations;
        } else {
            return [];
        }
    })();

    var colors = [
        {
            className: "yellow"
        },

        {
            className: "green"
        },

        {
            className: "pink"
        },

        {
            className: "blue"
        }
    ];
    var annotator = Object.create(Annotator);

    annotator.init({
        containerElement: "#viewer",
        annotations: [],
        existingTags: tags,
        colors: colors
    });
    annotator.startListening();

    document.addEventListener("textlayerrendered", function (event) {
        if (event.detail.pageNumber === PDFViewerApplication.page) {
            console.log('Finished rendering!');
            console.log('annotations', annotations);
            annotator.renderExistingAnnotations(annotations)
        }

    });

});