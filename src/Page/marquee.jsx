import React from 'react'

function marqree() {
    return (
        <div>

            <marquee
                behavior="scroll" // scroll // slide // alternate
                direction="left"  // left // right //up // down 
                scrollamount="10" // second speed
                onMouseOver={(e) => e.target.stop()}
                onMouseOut={(e) => e.target.start()}
                className="font-bold text-3x1 mt-20"
            >
                Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional
                footballer who plays as a forward for and captains both the Saudi Pro League club Al Nassr and the Portugal national team.
            </marquee>

        </div >
    )
}

export default marqree