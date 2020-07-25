'use strict';


function initModalDialog(event, modal_element) {
    /*
        You can customize the modal layout specifing optional "data" attributes
        in the element (either <a> or <button>) which triggered the event;
        "modal_element" identifies the modal HTML element.

        Sample call:

        <a href=""
           data-title="Set value"
           data-subtitle="Insert the new value to be assigned to the Register"
           data-dialog-class="modal-lg"
           data-icon="fa-keyboard-o"
           data-button-save-label="Save"
           onclick="openModalDialog(event, '#modal_generic'); return false;">
            <i class="fa fa-keyboard-o"></i> Open generic modal (no contents)
        </a>
    */
    var modal = $(modal_element);
    if (modal.length <= 0) {
        console.log('ERROR: modal "%o" not found', modal_element);
        display_server_error(sprintf('ERROR: modal "%s" not found', modal_element));
    }
    var target = $(event.target);

    var title = target.data('title') || '';
    var subtitle = target.data('subtitle') || '';
    // either "modal-lg" or "modal-sm" or nothing
    var dialog_class = (target.data('dialog-class') || '') + ' modal-dialog';
    var icon_class = (target.data('icon') || 'fa-laptop') + ' fa modal-icon';
    var button_save_label = target.data('button-save-label') || 'Save changes';

    modal.find('.modal-dialog').attr('class', dialog_class);
    modal.find('.modal-title').text(title);
    modal.find('.modal-subtitle').text(subtitle);
    modal.find('.modal-header .title-wrapper i').attr('class', icon_class);
    modal.find('.modal-footer .btn-save').text(button_save_label);
    modal.find('.modal-body').html('');

    // Annotate with target (just in case)
    modal.data('target', target);

    if (modal.hasClass('draggable')) {
        modal.find('.modal-dialog').draggable({
            handle: '.modal-header'
        });
    }

    return modal;
}


function openModalDialog(event, modal) {
    // If "modal" is a selector, initialize a modal object,
    // otherwise just use it
    if ($.type(modal) == 'string') {
        modal = initModalDialog(event, modal);
    }
    modal.modal('show');
}


function formAjaxSubmit(modal, action, cbAfterLoad, cbAfterSuccess) {
    var form = modal.find('.modal-body form');
    var header = $(modal).find('.modal-header');

    // use footer save button, if available
    var btn_save = modal.find('.modal-footer .btn-save');
    if (btn_save) {
        modal.find('.modal-body form .form-submit-row').hide();
        btn_save.off().on('click', function(event) {
            modal.find('.modal-body form').submit();
        });
    }
    if (cbAfterLoad) { cbAfterLoad(modal); }

    // Give focus to first visible form field
    modal.find('form input:visible').first().focus();

    // bind to the form’s submit event
    $(form).on('submit', function(event) {

        // prevent the form from performing its default submit action
        event.preventDefault();
        header.addClass('loading');

        var url = $(this).attr('action') || action;

        // serialize the form’s content and send via an AJAX call
        // using the form’s defined action and method
        $.ajax({
            type: $(this).attr('method'),
            url: url,
            data: $(this).serialize(),
            success: function(xhr, ajaxOptions, thrownError) {

                // update the modal body with the new form
                $(modal).find('.modal-body').html(xhr);

                // If the server sends back a successful response,
                // we need to further check the HTML received

                // If xhr contains any field errors,
                // the form did not validate successfully,
                // so we keep it open for further editing
                if ($(xhr).find('.has-error').length > 0) {
                    formAjaxSubmit(modal, url, cbAfterLoad, cbAfterSuccess);
                } else {
                    // otherwise, we've done and can close the modal
                    $(modal).modal('hide');
                    if (cbAfterSuccess) { cbAfterSuccess(modal); }
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log('SERVER ERROR: ' + thrownError);
            },
            complete: function() {
                header.removeClass('loading');
            }
        });
    });
}


function openModalDialogWithForm(event, modal, cbAfterLoad, cbAfterSuccess) {
    // If "modal" is a selector, initialize a modal object,
    // otherwise just use it
    if ($.type(modal) == 'string') {
        modal = initModalDialog(event, modal);
    }

    var url = $(event.target).data('action');
    if (!url) {
        console.log('ERROR: openModalDialogWithForm() could not retrieve action from event');
        return;
    }

    $.ajax({
        type: 'GET',
        url: url
    }).done(function(data, textStatus, jqXHR) {
        modal.find('.modal-body').html(data);
        modal.modal('show');
        formAjaxSubmit(modal, url, cbAfterLoad, cbAfterSuccess);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert('SERVER ERROR: ' + errorThrown);
    });
}


/**
 * Invoke remote action upon user confirmation.
 *
 * Display a dialog to ask for user confirmation, then invoke remote action;
 * after successfull execution, call supplied callback with server result.
 *
 * @param {string}              url         Server action to be invoked.
 * @param {string}              title       Title for confirmation modal dialog.
 * @param {afterDoneCallback}   [function]  Callback to be invoked after successfull execution.
 *
 * @return {none}
 */

function confirmRemoteAction(url, title, afterDoneCallback) {
    var modal = $('#modal_confirm');
    modal.find('.modal-body p').text(title);
    modal.find('.btn-yes').off().on('click', function() {
        // User selected "Yes", so proceed with remote call
        $.ajax({
            type: 'GET',
            url: url
        }).done(function(data) {
            if (afterDoneCallback) {
                afterDoneCallback(data);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            display_server_error(errorThrown);
        });
    });
    modal.modal('show');
}


function display_server_error(errorThrown) {
    alert('SERVER ERROR: ' + errorThrown);
}


