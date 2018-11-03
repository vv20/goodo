class FlashCard {

    constructor(fcTitle, front, back) {
        this.fcTitle = fcTitle;
        this.front = front;
        this.back = back;
    }

    getTitle() {
        return this.fcTitle;
    }

    getFront() {
        return this.front;
    }

    getBack() {
        return this.back;
    }

}

$('body').on('click', '.flash-card > .fc-button > button', function(e) {
    $(e.target).addClass('hidden');
    $(e.target.parentElement.parentElement.getElementsByClassName('fc-answer')[0]).removeClass('hidden');
});