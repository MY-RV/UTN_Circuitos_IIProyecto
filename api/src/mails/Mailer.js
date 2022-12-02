const { createTransport } = require("nodemailer");
const { getVariables } = require("../environment/variables");
const { TemplateMapper } = require("./templateMapper");
const { mail } = getVariables();

exports.Mailer = class {
  config = { to: null, from: null, subject: null, template: null };

  constructor(args = {}) {
    this.config.from = mail.from;
    this.setConfig(args);
  }

  send(args) {
    const mapper = new TemplateMapper();
    const html = mapper.mapHTML({ template: this.config.template, args });
    const options = { ...this.getConfig("to", "from", "subject"), html };

    const transporter = createTransport(mail.mailtrap);
    transporter.sendMail(options, (error, info) => {
      console.log(error || `Email sent: ${info.response}`);
    });
  }

  setConfig(args) {
    Object.keys(this.config).forEach((key) => {
      this.config[key] = args[key] || this.config[key];
    });
  }

  getConfig(...keys) {
    return keys.reduce((response, key) => {
      response[key] = this.config[key];
      return response;
    }, {});
  }
};
