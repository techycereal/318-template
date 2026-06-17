import PageTemplate from "./PageTemplate";

export default function Kids() {
    const sections = [
        {
            title: "Worshiping Together as a Family",
            Description: () => (
                <div className="space-y-4">
    <p>
        We love kids around here. We really do. And because we value them so much, you’ll notice something a little different about our Sundays: <strong>we don't separate families.</strong> 
    </p>
    <p>
        When you come to our church, everyone stays together. We believe that when children see their parents singing, praying, and listening to God’s Word, it leaves a lasting impression. There is something incredibly powerful about passing down a passion for Jesus just by letting your kids watch you worship Him.
    </p>
    <p>
        Now, we also know that sitting through a sermon can be tough for little ones. We don’t expect them to sit like statues, and a little rustling doesn't bother us at all! To help keep them intrigued and engaged, we always have resources ready for them at the door, including sermon notes, crayons, colored pencils, and fun paper games.
    </p>
    <p>
        While we don't separate the kids on Sunday mornings, we still want them to build great friendships. That's why we plan fun monthly events just for the kids to get together, play, and learn how to love and care for "one another" as friends in Christ.
    </p>
</div>
            ),
            image: '/churchImages/Kids.webp',
            imgSize: 'aspect-[16/9]',
        },
        {
            title: "Comfort for Moms & Little Ones",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        We know that training young hearts takes time, and sometimes babies or toddlers just need a change of scenery or a quiet space to settle down. 
                    </p>
                    <p>
                        Our nursery room is fully available for moms with infants and young kids. It offers a comfortable, private space to nurse, play, or soothe your little ones without feeling isolated from the body.
                    </p>
                </div>
            ),
            video: '/Nuresery.mp4', 
            imgSize: 'aspect-[9/16]',
        },
        {
            title: "Never Miss a Moment",
            Description: () => (
                <div className="space-y-4">
                    <p>
                        You don't have to sacrifice hearing the sermon just because you stepped out of the worship and fellowship center. 
                    </p>
                    <p>
                        Our nursery room features a live video feed of the main service. You can care for your children in a relaxed environment while remaining completely connected to the worship and teaching happening next door.
                    </p>
                </div>
            ),
            image: '/churchImages/Nursery.webp',
            imgSize: 'aspect-[16/9]',
        }
    ];

    return (
        <PageTemplate 
            heroTitle="3:18 Kids & Families" 
            heroImage="/churchImages/churchInside.webp" 
            sections={sections} 
        />
    );
}