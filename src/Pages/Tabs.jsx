import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import StrukturKelas from "./StrukturKelas"
import Schedule from "./Schedule"
import ProfileSection from "./ProfileSection"
import AOS from "aos"
import "aos/dist/aos.css"

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

// Fungsi TabPanel digunakan untuk menampilkan konten per-tab
function TabPanel(props) {
	useEffect(() => {
		AOS.init()
		AOS.refresh()
	}, [])

	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 0 }}>
					<Typography component="div">{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	}
}

// Komponen utama
export default function FullWidthTabs() {
	const theme = useTheme()
	const [value, setValue] = React.useState(0)
	const swiperRef = useRef(null)

	const handleChange = (event, newValue) => {
		setValue(newValue)
		if (swiperRef.current) {
			swiperRef.current.slideTo(newValue)
		}
	}

	return (
		<div className="md:px-[10%] md:mt-5 mt-8" id="Tabs" data-aos="fade-up" data-aos-duration="800">
			<div className="font-medium text-[1.6rem] md:text-[1.8rem] relative md:top-[2.8rem] top-[2.7rem] text-center text-white" id="Glow">
				
			</div>
			<Box sx={{ width: "100%" }}>
				<AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none" }} className="px-[10%]">
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="inherit"
						indicatorColor="inherit"
						variant="scrollable"
						scrollButtons="auto"
						sx={{
							display: "flex",
							justifyContent: "center",
							width: "auto",
							margin: "0 auto",
							"& .MuiTabs-indicator": {
								borderBottom: "2px solid white",
							},
						}}
						className="font-medium text-white text-2xl text-center mt-16"
						id="Glow">
						<Tab label="Structure" {...a11yProps(0)} />
						<Tab label="Schedule" {...a11yProps(1)} />
						<Tab label="Profile" {...a11yProps(2)} />
					</Tabs>
				</AppBar>

				{/* Ganti SwipeableViews dengan Swiper */}
				<Swiper
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					onSlideChange={(swiper) => setValue(swiper.activeIndex)}
					modules={[Pagination]}
					pagination={{ clickable: true }}
					spaceBetween={30}
					slidesPerView={1}
					className="mySwiper mt-10"
				>
					<SwiperSlide>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<StrukturKelas />
						</TabPanel>
					</SwiperSlide>

					<SwiperSlide>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<Schedule />
						</TabPanel>
					</SwiperSlide>

					<SwiperSlide>
						<TabPanel value={value} index={2} dir={theme.direction}>
							<ProfileSection />
						</TabPanel>
					</SwiperSlide>
				</Swiper>
			</Box>
		</div>
	)
}
