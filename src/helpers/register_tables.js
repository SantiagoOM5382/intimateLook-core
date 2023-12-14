const registerPartnerTable = (text, city, name, email, phone, companyName, companyType) => {
  return `<h2>${text}</h2>
          <table style="height: 186px; width: 448px;" border="3">
          <tbody>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Municipio</td>
          <td style="height: 23px; width: 323px;">${city}&nbsp;</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Nombre completo</td>
          <td style="height: 23px; width: 323px;">${name}&nbsp;</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Email</td>
          <td style="height: 23px; width: 323px;">&nbsp;${email}</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Celular</td>
          <td style="height: 23px; width: 323px;">&nbsp;${phone}</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Razón social</td>
          <td style="height: 23px; width: 323px;">&nbsp;${companyName}</td>
          </tr>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Tipo de empresa</td>
          <td style="height: 23px; width: 323px;">&nbsp;${companyType}</td>
          </tr>
          </tbody>
          </table>`
}

const registerDriverTable = (text, city, name, email, phone, vehicleType) => {
  return `<h2>${text}</h2>
          <table style="height: 186px; width: 448px;" border="3">
          <tbody>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Municipio</td>
          <td style="height: 23px; width: 323px;">${city}&nbsp;</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Nombre completo</td>
          <td style="height: 23px; width: 323px;">${name}&nbsp;</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Email</td>
          <td style="height: 23px; width: 323px;">&nbsp;${email}</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Celular</td>
          <td style="height: 23px; width: 323px;">&nbsp;${phone}</td>
          </tr>
          <tr style="height: 23px;">
          <td style="height: 23px; width: 122px;">&nbsp;Tipo de vehiculo</td>
          <td style="height: 23px; width: 323px;">&nbsp;${vehicleType}</td>
          </tr>
          </tbody>
          </table>`
}

module.exports = {
  registerPartnerTable,
  registerDriverTable
}
