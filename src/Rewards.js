import React from "react";

const orders = [
  {
    customerId: "12345",
    orderDate: "07/09/2020",
    orderValue: 110
  },
  {
    customerId: "12345",
    orderDate: "07/01/2020",
    orderValue: 90
  },
  {
    customerId: "12345",
    orderDate: "06/29/2020",
    orderValue: 130
  },
  {
    customerId: "12345",
    orderDate: "06/25/2020",
    orderValue: 75
  },
  {
    customerId: "12345",
    orderDate: "06/08/2020",
    orderValue: 65
  },
  {
    customerId: "23456",
    orderDate: "06/08/2020",
    orderValue: 65
  }
];

function computeRewards() {
  let mySet = new Set(orders.map(order => order.customerId));

  let rewards = [];

  for (let cusid of mySet) {
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let customerOrders = orders.filter(order => order.customerId === cusid);

    let monthMap = new Map();

    for (let order of customerOrders) {
      let currentMonth = month[new Date(order.orderDate).getMonth()];
      if (!monthMap.has(currentMonth)) {
        monthMap.set(currentMonth, 0);
      }

      let currentPoint = monthMap.get(currentMonth);

      const orderValue = order.orderValue;
      if (orderValue > 50 && orderValue <= 100) {
        currentPoint = currentPoint + (orderValue - 50);
      } else if (orderValue > 50 && orderValue > 100) {
        currentPoint = currentPoint + 1 * 50 + 2 * (orderValue - 100);
      }
      monthMap.set(currentMonth, currentPoint);
    }

    let totalRewards = 0;
    for (let [key, value] of monthMap) {
      let reward = {};
      reward["id"] = cusid;
      reward["month"] = key;
      reward["value"] = value;
      totalRewards = totalRewards + value;
      rewards.push(reward);
      reward["totalRewards"] = totalRewards;
    }
  }
  return rewards;
}

class Rewards extends React.Component {
  constructor() {
    super();
    let rewards = computeRewards();
    this.state = {
      rewards: rewards
    };
  }

  componentDidMount() {
    let rewards = computeRewards();
    setTimeout(() => {
      this.setState({
        rewards: rewards
      });
    }, 3000);
  }

  render() {
    const rewards = this.state.rewards;
    return (
      <>
        <table id="customers">
          <tr>
            <th> Customer id </th>
            <th> Month </th>
            <th> Rewards </th>
            <th> Total Rewards </th>
          </tr>
          {rewards.map((item, index) => {
            return (
              <>
                <tr>
                  <th> {item.id} </th>
                  <th> {item.month} </th>
                  <th> {item.value} </th>
                  <th> {item.totalRewards} </th>
                </tr>
              </>
            );
          })}{" "}
        </table>{" "}
      </>
    );
  }
}

export default Rewards;
