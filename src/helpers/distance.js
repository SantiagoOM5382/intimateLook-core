function distance (latitude, longitude, branchOffice) {
  return Math.sqrt(
    Math.pow(
      69.1 * (Number(branchOffice.latitude) - Number(latitude)),
      2
    ) +
    Math.pow(
      69.1 * (Number(longitude) - Number(branchOffice.longitude)) * Math.cos(Number(branchOffice.latitude) / 57.3),
      2
    )
  ) * 1.609
}

module.exports = distance
