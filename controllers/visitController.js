import Visit from "../models/Visit.js";

export async function recordVisit(req, res, next) {
  try {
    const { sessionId, page } = req.body;
    await Visit.create({
      sessionId: sessionId || "",
      page: page || "/",
    });
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function getVisitStats(req, res, next) {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const [total, today, thisWeek, thisMonth, uniqueVisitors] = await Promise.all([
      Visit.countDocuments(),
      Visit.countDocuments({ createdAt: { $gte: todayStart } }),
      Visit.countDocuments({ createdAt: { $gte: weekStart } }),
      Visit.countDocuments({ createdAt: { $gte: monthStart } }),
      Visit.distinct("sessionId").then((ids) => ids.filter(Boolean).length),
    ]);

    const last7Days = await Visit.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const found = last7Days.find((item) => item._id === key);
      days.push({
        date: key,
        day: d.toLocaleDateString("id-ID", { weekday: "short" }),
        count: found ? found.count : 0,
      });
    }

    res.json({
      total,
      today,
      thisWeek,
      thisMonth,
      uniqueVisitors,
      last7Days: days,
    });
  } catch (err) {
    next(err);
  }
}
