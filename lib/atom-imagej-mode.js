'use babel';

import AtomImagejModeView from './atom-imagej-mode-view';
import { CompositeDisposable } from 'atom';

export default {

  atomImagejModeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomImagejModeView = new AtomImagejModeView(state.atomImagejModeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomImagejModeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-imagej-mode:run_script': () => this.run_script()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomImagejModeView.destroy();
  },

  serialize() {
    return {
      atomImagejModeViewState: this.atomImagejModeView.serialize()
    };
  },

  run_script() {
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {

        extension = editor.getPath().split('.').pop();
        script_body = editor.getText();

        var http = require('http');

        function reqListener () {
          console.log(this.responseText);
          //alert(this.responseText);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("POST", "http://localhost:8080/modules/command:net.imagej.server.external.ScriptEval?process=false");
        oReq.setRequestHeader('Content-type', 'application/json');

        oReq.send(JSON.stringify({"language": extension, "script": script_body}));
      }

    }

};
