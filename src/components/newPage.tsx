import PageTemplate from "./PageTemplate";

export default function WhatToExpect() {
    const sections = [
        {
            title: "Sunday Service",
            time: "Sundays at 10:30 AM", // Moved cleanly here to prevent component errors
            Description: () => {
                return (
                    <div className="space-y-6">
                        <p className="font-semibold text-gray-900 text-lg">
                            Our services are typically about 75 minutes long and focus closely on the corporate worship of God. Here is what we do:
                        </p>
                        <ul className="space-y-3 list-none pl-0">
                            <li><strong className="font-bold text-gray-900">Singing:</strong> We praise God and encourage each other with gospel-centered songs.</li>
                            <li><strong className="font-bold text-gray-900">Scripture Reading:</strong> We love the Bible, so we stand together to read the text we're studying.</li>
                            <li><strong className="font-bold text-gray-900">Preaching:</strong> We preach the unchanging truth of Scripture and seek to apply the Gospel directly to our lives.</li>
                            <li><strong className="font-bold text-gray-900">Communion:</strong> We celebrate the Lord’s Supper regularly reminder of Jesus’ life, death, and substitutionary sacrifice for our sins.</li>
                            <li><strong className="font-bold text-gray-900">Giving:</strong> We give back as a joyful response to God’s grace to extend our church’s reach into our community.</li>
                        </ul>
                    </div>
                );
            },
            image: '/churchImages/churchInside.webp',
            imgSize: 'aspect-[16/9]'
        },
        {
            title: "Sunday Fellowship Meal",
            time: "Sundays at 12:15 PM",
            Description: () => {
                return (
                    <div className="space-y-4">
                        <p className="font-semibold text-gray-900 text-lg">
                            Following the early Church pattern, we break bread together to visually express our shared life in Christ.
                        </p>
                        <ul className="space-y-3 list-none pl-0">
                            <li><strong className="font-bold text-gray-900">Weekly Gathering:</strong> We come together every single Sunday right after the service to share an open meal.</li>
                            <li><strong className="font-bold text-gray-900">Building Relationships:</strong> Eating unhurried meals allows organic friendships to grow, burdens to be shared, and encouragement to flow naturally.</li>
                            <li><strong className="font-bold text-gray-900">Hospitality & Welcome:</strong> The lunch table is where newcomers are embraced, questions are discussed, and church becomes family.</li>
                            <li><strong className="font-bold text-gray-900">Fun & Fellowship:</strong> It's a joyful environment for all ages—while the adults connect, the kids have a great time playing basketball and shuffleboard together.</li>
                        </ul>
                    </div>
                );
            },
            image: '/pexels-fauxels-3184183.jpg',
            imgSize: 'aspect-[16/9]'
        },
        {
            title: "Upon Your Arrival",
            Description: () => {
                return (
                    <div className="space-y-4">
                        <p>
                            We want your first visit to be as smooth, clear, and welcoming as possible! When you pull up, you'll find clear signage and a friendly team ready to greet you at the doors.
                        </p>
                        <p>
                            Watch our quick arrival walkthrough video to see exactly where to enter, where to head for the worship and fellowship center, and how to find our community gathering spaces.
                        </p>
                    </div>
                );
            },
            // Your vertical walkthrough arrival video frame
            video: '/ArrivalParking.mp4',
            imgSize: 'aspect-[9/16]',
            thumbnail: '/thumbnail.png'
        },
    ];

    return (
        <PageTemplate
            heroTitle="What To Expect"
            heroImage="/churchImages/churchOutside.webp"
            sections={sections}
        />
    );
}