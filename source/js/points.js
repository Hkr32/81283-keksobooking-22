let points = [];
const pointsLimit = 10;

function getPoints() {
  return points;
}

function setPoints(rawPoints) {
  points = rawPoints;
}

export {
  pointsLimit,
  getPoints,
  setPoints
};
