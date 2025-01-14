-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 08:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlynhatro`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CapNhatPhong` (IN `p_MaPhongCu` CHAR(10), IN `p_MaNhaTroCu` CHAR(10), IN `p_MaPhongMoi` CHAR(10), IN `p_MaNhaTroMoi` CHAR(10), IN `p_ChiềuDai` FLOAT, IN `p_ChiềuRong` FLOAT, IN `p_MoTa` TEXT, IN `p_NgayTao` DATE, IN `p_Madv1` CHAR(10), IN `p_Giadv1` INT, IN `p_Madv2` CHAR(10), IN `p_Giadv2` INT, IN `p_Madv3` CHAR(10), IN `p_Giadv3` INT)   BEGIN
    DECLARE roomExists INT DEFAULT 0;

    -- Start Transaction
    START TRANSACTION;

    -- Check if the MaPhongMoi and MaNhaTroMoi exist when they are changed
    IF p_MaPhongCu != p_MaPhongMoi OR p_MaNhaTroCu != p_MaNhaTroMoi THEN
        SELECT COUNT(*) INTO roomExists
        FROM phong
        WHERE MAPHONG = p_MaPhongMoi AND MANHATRO = p_MaNhaTroMoi;

        IF roomExists > 0 THEN
            -- Room already exists
            ROLLBACK;
            SELECT 0 AS Status, 'Mã phòng này đã tồn tại' AS Message;
        ELSE
            -- Update Phong with new MaPhong and MaNhaTro
            UPDATE phong
            SET 
                MAPHONG = p_MaPhongMoi,
                MANHATRO = p_MaNhaTroMoi,
                CHIEUDAI = p_ChiềuDai,
                CHIEURONG = p_ChiềuRong,
                MOTA = p_MoTa,
                NGAYTAO = p_NgayTao
            WHERE 
                MAPHONG = p_MaPhongCu AND MANHATRO = p_MaNhaTroCu;

            -- Update DichVuPhong with new MaPhong and MaNhaTro
            UPDATE dichvu_phong
            SET 
                MAPHONG = p_MaPhongMoi,
                MANHATRO = p_MaNhaTroMoi,
                GIA = p_Giadv1
            WHERE 
                MAPHONG = p_MaPhongMoi AND MANHATRO = p_MaNhaTroMoi AND 
                MADICHVU = p_Madv1;
                
            UPDATE dichvu_phong
            SET 
                MAPHONG = p_MaPhongMoi,
                MANHATRO = p_MaNhaTroMoi,
                GIA = p_Giadv2
            WHERE 
                MAPHONG = p_MaPhongMoi AND MANHATRO = p_MaNhaTroMoi AND 
                MADICHVU = p_Madv2;
			
            UPDATE dichvu_phong
            SET 
                MAPHONG = p_MaPhongMoi,
                MANHATRO = p_MaNhaTroMoi,
                GIA = p_Giadv3
            WHERE 
                MAPHONG = p_MaPhongMoi AND MANHATRO = p_MaNhaTroMoi AND 
                MADICHVU = p_Madv3;
                
            COMMIT;
            SELECT 1 AS Status, 'Cập nhật thành công' AS Message;
        END IF;
    ELSE
        -- Update Phong without changing MaPhong and MaNhaTro
        UPDATE phong
        SET 
            CHIEUDAI = p_ChiềuDai,
            CHIEURONG = p_ChiềuRong,
            MOTA = p_MoTa,
            NGAYTAO = p_NgayTao
        WHERE 
            MAPHONG = p_MaPhongCu AND MANHATRO = p_MaNhaTroCu;

        -- Update DichVuPhong
        UPDATE dichvu_phong
        SET 
            GIA = p_Giadv1
        WHERE 
            MAPHONG = p_MaPhongCu AND MANHATRO = p_MaNhaTroCu AND 
            MADICHVU = p_Madv1;
            
        UPDATE dichvu_phong
        SET 
            GIA = p_Giadv2
        WHERE 
            MAPHONG = p_MaPhongCu AND MANHATRO = p_MaNhaTroCu AND 
            MADICHVU = p_Madv2;
            
        UPDATE dichvu_phong
        SET 
            GIA = p_Giadv3
        WHERE 
            MAPHONG = p_MaPhongCu AND MANHATRO = p_MaNhaTroCu AND 
            MADICHVU = p_Madv3;

        COMMIT;
        SELECT 1 AS Status, 'Cập nhật thành công' AS Message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNguoiDungInfo` (IN `p_IDNguoiDung` CHAR(10))   BEGIN
    SELECT HOTEN, SODIENTHOAI, CCCD
    FROM nguoidung
    WHERE IDNGUOIDUNG = p_IDNguoiDung;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `laydichvuphongdesua` (IN `p_MANHATRO` CHAR(10), IN `p_MAPHONG` CHAR(10))   BEGIN
    SELECT 
        d.TENDICHVU,
        dp.gia,
        dp.MADICHVU
    FROM 
        dichvu_phong dp
    JOIN 
        dichvu d ON dp.MADICHVU = d.MADICHVU
    WHERE 
        dp.MANHATRO = p_MANHATRO
        AND dp.MAPHONG = p_MAPHONG;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layDoanhThu` (IN `p_machutro` CHAR(10), IN `p_nam` INT, IN `p_manhatro` CHAR(10))   BEGIN
    SELECT 
        MONTH(h.NGAYLAPHOADON) AS Thang,
        YEAR(h.NGAYLAPHOADON) AS Nam,
        SUM(h.TONGTIEN) AS TongDoanhThu
    FROM 
        HOADON h
        JOIN NHATRO n ON n.MANHATRO = h.MANHATRO
    WHERE 
        n.IDNGUOIDUNG = p_machutro -- Lọc theo mã chủ trọ
        AND (p_nam IS NULL OR YEAR(h.NGAYLAPHOADON) = p_nam) -- Lọc theo năm (nếu không NULL)
        AND (p_manhatro IS NULL OR h.MANHATRO = p_manhatro) -- Lọc theo mã nhà trọ (nếu không NULL)
        AND h.MATRANGTHAIHD = '1' -- Chỉ chọn các hóa đơn đã thanh toán
    GROUP BY 
        YEAR(h.NGAYLAPHOADON), MONTH(h.NGAYLAPHOADON)
    ORDER BY 
        Nam, Thang;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LayHoaDon` (IN `p_MaChuTro` CHAR(10), IN `p_MaHoaDon` CHAR(10), IN `p_manhatro` CHAR(10), IN `p_MaPhong` CHAR(10), IN `p_NgayLapHoaDon` DATE, IN `p_MaTrangThaiHD` CHAR(10), IN `p_Page` INT, IN `p_PageSize` INT)   BEGIN
    DECLARE v_Offset INT;
    SET v_Offset = (p_Page - 1) * p_PageSize;

    -- Main query for paginated data
    SELECT 
        h.MAHOADON,
        nt.TENNHATRO,
        h.MAPHONG,
        h.NGAYLAPHOADON,
        h.TONGTIEN,
        h.MATRANGTHAIHD
    FROM 
        HOADON h
    JOIN 
        nhatro nt ON nt.MANHATRO = h.MANHATRO
    WHERE 
        nt.IDNGUOIDUNG = p_MaChuTro AND
        (p_MaHoaDon IS NULL OR h.MAHOADON LIKE CONCAT(p_MaHoaDon, '%')) AND
        (p_manhatro IS NULL OR h.MANHATRO = p_manhatro) AND
        (p_MaPhong IS NULL OR h.MAPHONG = p_MaPhong) AND
        (p_NgayLapHoaDon IS NULL OR h.NGAYLAPHOADON = p_NgayLapHoaDon) AND
        (p_MaTrangThaiHD IS NULL OR h.MATRANGTHAIHD = p_MaTrangThaiHD)
    LIMIT p_PageSize OFFSET v_Offset;

    -- Count query to get the total number of records
    SELECT 
        COUNT(*) AS TotalRecords
    FROM 
        HOADON h
    JOIN 
        nhatro nt ON nt.MANHATRO = h.MANHATRO
    WHERE 
        nt.IDNGUOIDUNG = p_MaChuTro AND
        (p_MaHoaDon IS NULL OR h.MAHOADON LIKE CONCAT(p_MaHoaDon, '%')) AND
        (p_manhatro IS NULL OR h.MANHATRO = p_manhatro) AND
        (p_MaPhong IS NULL OR h.MAPHONG = p_MaPhong) AND
        (p_NgayLapHoaDon IS NULL OR h.NGAYLAPHOADON = p_NgayLapHoaDon) AND
        (p_MaTrangThaiHD IS NULL OR h.MATRANGTHAIHD = p_MaTrangThaiHD);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LayNguoiDungDeSua` (IN `p_IDNguoiDung` CHAR(10))   BEGIN
    SELECT HOTEN, SODIENTHOAI, CCCD
    FROM nguoidung
    WHERE IDNGUOIDUNG = p_IDNguoiDung;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LayNguoiThuePhong` (IN `machutro` CHAR(10), IN `ten` VARCHAR(50), IN `manhatro` CHAR(10), IN `maphong` CHAR(10), IN `pageSize` INT, IN `pageNumber` INT)   BEGIN
    -- Calculate the starting index for pagination
    DECLARE startIndex INT;
    SET startIndex = (pageNumber - 1) * pageSize;

    -- Main query
     SELECT 
     nguoidung.IDNGUOIDUNG,
        nguoidung.HOTEN, 
        temp.maphong, 
        temp.ngayvaophong, 
        nguoidung.SODIENTHOAI, 
        temp.tennhatro,
        CEIL(COUNT(*) OVER () / pageSize) AS TotalPages -- Total 
    FROM nguoidung
    JOIN (
        SELECT 
            nhatro.TENNHATRO, 
            nguoidung_phong.MANHATRO, 
            nguoidung_phong.MAPHONG, 
            nguoidung_phong.IDNGUOIDUNG, 
            nguoidung_phong.NGAYVAOPHONG
        FROM nhatro
        JOIN nguoidung_phong 
        ON nguoidung_phong.MANHATRO = nhatro.MANHATRO
        WHERE nhatro.IDNGUOIDUNG = machutro
    ) AS temp
    ON temp.IDNGUOIDUNG = nguoidung.IDNGUOIDUNG
    WHERE 
        (ten IS NULL OR nguoidung.HOTEN LIKE CONCAT('%', ten, '%')) 
        AND (manhatro IS NULL OR temp.MANHATRO = manhatro) 
        AND (maphong IS NULL OR temp.MAPHONG = maphong) 
    LIMIT startIndex, pageSize;
    
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LayNhaTro` (IN `machutro` CHAR(10), IN `tentro` VARCHAR(255), IN `pageSize` INT, IN `pageNumber` INT)   BEGIN
    DECLARE totalRecords INT;
    DECLARE totalPages INT;
    DECLARE v_Offset INT;
    SET v_Offset = (pageNumber - 1) * pageSize;

    -- Calculate total number of records
    SELECT COUNT(*) INTO totalRecords
    FROM NHATRO NT
    WHERE 
        NT.IDNGUOIDUNG = machutro
        AND (tentro IS NULL OR NT.TENNHATRO LIKE CONCAT('%', tentro, '%'));

    -- Calculate total pages
    SET totalPages = CEIL(totalRecords / pageSize);

    -- Paginated query
    SELECT 
        NT.MANHATRO,
        NT.TENNHATRO,
        NT.NGAYTAO,
        NT.CHIEUDAI,
        NT.CHIEURONG,
        COUNT(P.MAPHONG) AS SO_LUONG_PHONG,
        totalPages AS TotalPages
    FROM 
        NHATRO NT
    LEFT JOIN 
        PHONG P ON NT.MANHATRO = P.MANHATRO
    WHERE 
        NT.IDNGUOIDUNG = machutro
        AND (tentro IS NULL OR NT.TENNHATRO LIKE CONCAT('%', tentro, '%'))
    GROUP BY 
        NT.MANHATRO, 
        NT.TENNHATRO, 
        NT.NGAYTAO, 
        NT.CHIEUDAI, 
        NT.CHIEURONG
    LIMIT pageSize OFFSET v_Offset;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LayPhong` (IN `p_maphong` CHAR(10), IN `p_manhatro` CHAR(10), IN `p_machutro` CHAR(10), IN `p_songuoitrongphong` INT, IN `p_pageSize` INT, IN `p_pageNumber` INT)   BEGIN
    -- Calculate the starting index for pagination
    DECLARE startIndex INT;
    SET startIndex = (p_pageNumber - 1) * p_pageSize;

    -- Subquery to calculate the number of people in each room
    WITH RoomDetails AS (
        SELECT 
        	NHATRO.MANHATRO,
            NHATRO.TENNHATRO,
            PHONG.MAPHONG,
            PHONG.CHIEUDAI,
            PHONG.CHIEURONG,
            PHONG.NGAYTAO,
            COUNT(NGUOIDUNG_PHONG.IDNGUOIDUNG) AS SO_NGUOI_TRONG_PHONG
        FROM 
            NHATRO
        INNER JOIN PHONG 
            ON NHATRO.MANHATRO = PHONG.MANHATRO
        LEFT JOIN NGUOIDUNG_PHONG 
            ON PHONG.MANHATRO = NGUOIDUNG_PHONG.MANHATRO
            AND PHONG.MAPHONG = NGUOIDUNG_PHONG.MAPHONG
        WHERE 
            (p_manhatro IS NULL OR PHONG.MANHATRO = p_manhatro) AND
            (p_maphong IS NULL OR PHONG.MAPHONG = p_maphong) AND
            NHATRO.IDNGUOIDUNG = p_machutro
        GROUP BY 
            NHATRO.TENNHATRO,
        NHATRO.MANHATRO,
            PHONG.MAPHONG,
            PHONG.CHIEUDAI,
            PHONG.CHIEURONG,
            PHONG.NGAYTAO
    )
    SELECT 
    RD.MANHATRO,
        RD.TENNHATRO,
        RD.MAPHONG,
        RD.CHIEUDAI,
        RD.CHIEURONG,
        RD.NGAYTAO,
        RD.SO_NGUOI_TRONG_PHONG,
        CEIL((SELECT COUNT(*) FROM RoomDetails) / p_pageSize) AS TotalPages
    FROM 
        RoomDetails RD
    WHERE 
        p_songuoitrongphong IS NULL OR
        (p_songuoitrongphong = 0 AND RD.SO_NGUOI_TRONG_PHONG = 0) OR
        (p_songuoitrongphong > 0 AND RD.SO_NGUOI_TRONG_PHONG > 0)
    LIMIT startIndex, p_pageSize;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `layphongdesua` (IN `p_MANHATRO` CHAR(10), IN `p_MAPHONG` CHAR(10))   BEGIN
    SELECT 
        p.CHIEUDAI,
        p.CHIEURONG,
        p.NGAYTAO,
        p.mota,
        n.TENNHATRO
    FROM 
        phong p
    JOIN 
        nhatro n ON n.MANHATRO = p.MANHATRO
    WHERE 
        p.MANHATRO = p_MANHATRO
        AND p.MAPHONG = p_MAPHONG;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ChiSoCu` (IN `manhatro` CHAR(10), IN `maphong` CHAR(10), IN `ngayghi` DATE)   BEGIN
    SELECT DISTINCT 
        dichvu.madichvu, 
        dichvu.tendichvu, 
        dichvu.DONVITINH, 
        chiso.CHISOCU, 
        chiso.NGAYGHI, 
        dichvu_phong.gia
    FROM 
        dichvu 
    JOIN 
        dichvu_phong 
        ON dichvu_phong.MADICHVU = dichvu.MADICHVU
    LEFT JOIN 
        chiso 
        ON chiso.MADICHVU = dichvu.MADICHVU
        AND chiso.MANHATRO = dichvu_phong.MANHATRO
        AND chiso.MAPHONG = dichvu_phong.MAPHONG
    WHERE 
        dichvu_phong.MANHATRO = manhatro 
        AND dichvu_phong.MAPHONG = maphong 
        AND (chiso.NGAYGHI < ngayghi OR chiso.NGAYGHI IS NULL)
    ORDER BY 
        chiso.NGAYGHI DESC 
    LIMIT 2;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateInvoiceAndDetails` (IN `maphong` CHAR(10), IN `manhatro` CHAR(10), IN `mahd` CHAR(10), IN `tongtien` FLOAT, IN `ngayghi` DATETIME, IN `madv2` CHAR(10), IN `chisomoidv2` FLOAT, IN `soluongdasudungdv2` INT, IN `madv3` CHAR(10), IN `chisomoidv3` FLOAT, IN `soluongdasudungdv3` INT)   BEGIN
    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Chèn vào bảng HOADON
    INSERT INTO hoadon (mahoadon, manhatro, maphong, ngaylaphoadon, tongtien, matrangthaihd)
    VALUES (mahd, manhatro, maphong, ngayghi, tongtien, '2');

    -- Chèn vào bảng CHITIETHD
    INSERT INTO chitiethd (mahoadon, madichvu, soluongdasudung)
    VALUES 
        (mahd, 'DV001', 1),
        (mahd, madv2, soluongdasudungdv2),
        (mahd, madv3, soluongdasudungdv3);

    -- Chèn vào bảng CHISO
    INSERT INTO chiso (ngayghi, manhatro, maphong, madichvu, chisocu)
    VALUES 
        (ngayghi, manhatro, maphong, madv2, chisomoidv2),
        (ngayghi, manhatro, maphong, madv3, chisomoidv3);

    -- Hoàn tất giao dịch
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetPhongInfoToFilter` (IN `manhatro` CHAR(10), IN `machutro` CHAR(10))   BEGIN 
    SELECT DISTINCT phong.MAPHONG
        FROM phong 
        JOIN nhatro 
        ON nhatro.MANHATRO = phong.MANHATRO
        join nguoidung on nguoidung.IDNGUOIDUNG = nhatro.IDNGUOIDUNG
        WHERE nguoidung.IDNGUOIDUNG = machutro
        AND (manhatro IS NULL OR phong.MANHATRO = manhatro);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetRoomInfo` (IN `maphong` CHAR(10), IN `manhatro` CHAR(10), IN `machutro` CHAR(10))   BEGIN
    SELECT 
        NHATRO.TENNHATRO,
        PHONG.MAPHONG,
        PHONG.CHIEUDAI,
        PHONG.CHIEURONG,
        PHONG.NGAYTAO,
        COUNT(NGUOIDUNG_PHONG.IDNGUOIDUNG) AS SO_NGUOI_TRONG_PHONG
    FROM 
        NHATRO
    INNER JOIN PHONG 
        ON NHATRO.MANHATRO = PHONG.MANHATRO
    LEFT JOIN NGUOIDUNG_PHONG 
        ON PHONG.MANHATRO = NGUOIDUNG_PHONG.MANHATRO
        AND PHONG.MAPHONG = NGUOIDUNG_PHONG.MAPHONG
    WHERE 
        (manhatro IS NULL OR PHONG.MANHATRO = manhatro) AND
        (maphong IS NULL OR PHONG.MAPHONG = maphong) AND
        NHATRO.IDNGUOIDUNG = machutro
    GROUP BY 
        NHATRO.TENNHATRO,
        PHONG.MAPHONG,
        PHONG.CHIEUDAI,
        PHONG.CHIEURONG,
        PHONG.NGAYTAO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_laychitiethoadon` (IN `p_manhatro` CHAR(10), IN `p_maphong` CHAR(10), IN `p_mahoadon` CHAR(10))   BEGIN
    SELECT 
        nhatro.tennhatro,
        hoadon.maphong,
        hoadon.mahoadon AS mahd,
        hoadon.tongtien,
        dichvu.tendichvu,
        dichvu_phong.gia,
        chitiethd.soluongdasudung,
        (dichvu_phong.gia * chitiethd.soluongdasudung) AS thanhtien
    FROM 
        hoadon
    JOIN 
        nhatro ON hoadon.manhatro = nhatro.manhatro
    JOIN 
        chitiethd ON hoadon.mahoadon = chitiethd.mahoadon
    JOIN 
        dichvu ON chitiethd.madichvu = dichvu.madichvu
    JOIN 
        dichvu_phong ON dichvu_phong.madichvu = dichvu.madichvu 
                     AND dichvu_phong.manhatro = hoadon.manhatro 
                     AND dichvu_phong.maphong = hoadon.maphong
    WHERE 
        hoadon.manhatro = p_manhatro
        AND hoadon.maphong = p_maphong
        AND hoadon.mahoadon = p_mahoadon;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_LayGiaPhong` (IN `maphong` CHAR(10), IN `manhatro` CHAR(10))   BEGIN
    SELECT DISTINCT 
        dichvu.madichvu, 
        dichvu.tendichvu, 
        dichvu_phong.gia
    FROM 
        dichvu
    JOIN 
        dichvu_phong 
        ON dichvu_phong.MADICHVU = dichvu.MADICHVU
    WHERE 
        dichvu_phong.MANHATRO = manhatro
        AND dichvu_phong.MAPHONG = maphong
        AND dichvu_phong.MADICHVU = 'DV001';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SuaNguoiDung` (IN `p_IDNguoiDung` CHAR(10), IN `p_HoTen` VARCHAR(255), IN `p_SoDienThoai` VARCHAR(15), IN `p_CCCD` VARCHAR(20))   BEGIN
    UPDATE nguoidung
    SET 
        HOTEN = p_HoTen,
        SODIENTHOAI = p_SoDienThoai,
        CCCD = p_CCCD
    WHERE 
        IDNGUOIDUNG = p_IDNguoiDung;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemNguoiDung` (IN `p_IDNguoiDung` CHAR(10), IN `p_MaLoaiNguoiDung` CHAR(10), IN `p_MatKhau` CHAR(100), IN `p_HoTen` VARCHAR(100), IN `p_SoDienThoai` VARCHAR(10), IN `p_AnhDaiDien` VARCHAR(100), IN `p_TaiKhoan` CHAR(100), OUT `result` INT, OUT `p_message` VARCHAR(255))   BEGIN
    -- Check if the TAIKHOAN already exists in NGUOIDUNG
    IF EXISTS (
        SELECT 1
        FROM NGUOIDUNG
        WHERE TAIKHOAN = p_TaiKhoan
    ) THEN
        -- TAIKHOAN exists, return 0 and a message
        SET result = 0;
        SET p_message = "Tài khoản đã tồn tại";
    ELSE
        -- Insert into NGUOIDUNG
        INSERT INTO NGUOIDUNG (IDNGUOIDUNG, MALOAINGUOIDUNG, MATKHAU, HOTEN, SODIENTHOAI, ANHDIADIEN, TAIKHOAN)
        VALUES (p_IDNguoiDung, p_MaLoaiNguoiDung, p_MatKhau, p_HoTen, p_SoDienThoai, p_AnhDaiDien, p_TaiKhoan);
        
        -- Return 1 indicating success and a success message
        SET result = 1;
        SET p_message = "Người dùng đã được thêm thành công";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemNguoiDungVaoPhong` (IN `p_IDNguoiDung` CHAR(10), IN `p_MaLoaiNguoiDung` CHAR(10), IN `p_MatKhau` CHAR(100), IN `p_HoTen` VARCHAR(100), IN `p_SoDienThoai` VARCHAR(10), IN `p_AnhDaiDien` VARCHAR(100), IN `p_TaiKhoan` CHAR(100), IN `p_ManhaTro` CHAR(10), IN `p_Maphong` CHAR(10), IN `p_NgayVaoPhong` DATE, OUT `p_result` INT, OUT `p_message` VARCHAR(255))   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback nếu có lỗi xảy ra
        ROLLBACK;
        SET p_result = 0;
        SET p_message = "Lỗi trong quá trình xử lý.";
    END;

    -- Bắt đầu khối chính
    main_block: BEGIN
        -- Bắt đầu giao dịch
        START TRANSACTION;

        -- Kiểm tra xem tài khoản đã tồn tại hay chưa
        IF EXISTS (
            SELECT 1
            FROM NGUOIDUNG
            WHERE TAIKHOAN = p_TaiKhoan
        ) THEN
            SET p_result = 0;
            SET p_message = "Tài khoản đã tồn tại";
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Thêm người dùng vào bảng NGUOIDUNG
        INSERT INTO NGUOIDUNG (IDNGUOIDUNG, MALOAINGUOIDUNG, MATKHAU, HOTEN, SODIENTHOAI, ANHDIADIEN, TAIKHOAN)
        VALUES (p_IDNguoiDung, p_MaLoaiNguoiDung, p_MatKhau, p_HoTen, p_SoDienThoai, p_AnhDaiDien, p_TaiKhoan);

        -- Kiểm tra ngày vào phòng
        IF EXISTS (
            SELECT 1
            FROM PHONG
            WHERE p_NgayVaoPhong <= NGAYTAO AND MAPHONG = p_Maphong AND MANHATRO = p_ManhaTro
        ) THEN
            SET p_result = 0;
            SET p_message = "Ngày vào phòng phải sau ngày tạo phòng";
            ROLLBACK;
            LEAVE main_block;
        END IF;

        -- Thêm thông tin vào bảng NGUOIDUNG_PHONG
        INSERT INTO NGUOIDUNG_PHONG (MANHATRO, MAPHONG, IDNGUOIDUNG, NGAYVAOPHONG)
        VALUES (p_ManhaTro, p_Maphong, p_IDNguoiDung, p_NgayVaoPhong);

        -- Hoàn tất giao dịch
        COMMIT;

        -- Thiết lập kết quả và thông báo thành công
        SET p_result = 1;
        SET p_message = "Thêm người dùng vào phòng thành công";
    END main_block;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemNhaTro` (IN `p_manhatro` CHAR(10), IN `p_idnguoidung` CHAR(10), IN `p_tennhatro` VARCHAR(100), IN `p_diadiem` VARCHAR(100), IN `p_ngaytao` DATE, IN `p_chieudai` FLOAT, IN `p_chieurong` FLOAT, IN `p_anhdaidien` VARCHAR(100))   BEGIN
        -- Insert the new record
        INSERT INTO NHATRO (
            MANHATRO, IDNGUOIDUNG, TENNHATRO, DIADIEM, NGAYTAO, CHIEUDAI, CHIEURONG, ANHDIDIEN
        ) VALUES (
            p_manhatro, p_idnguoidung, p_tennhatro, p_diadiem, p_ngaytao, p_chieudai, p_chieurong, p_anhdaidien
        );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ThemPhong` (IN `p_manhatro` CHAR(10), IN `p_maphong` CHAR(10), IN `p_mota` VARCHAR(100), IN `p_chieudai` FLOAT, IN `p_chieurong` FLOAT, IN `p_ngaytao` DATE, IN `p_madichvu1` CHAR(10), IN `p_gia1` INT, IN `p_madichvu2` CHAR(10), IN `p_gia2` INT, IN `p_madichvu3` CHAR(10), IN `p_gia3` INT, OUT `p_result` INT)   BEGIN

    -- Check if MAPHONG already exists
    IF EXISTS (
        SELECT 1
        FROM PHONG
        WHERE MANHATRO = p_manhatro AND MAPHONG = p_maphong
    ) THEN
        -- If exists, return 0
        SET p_result = 0;
    ELSE
        -- If not exists, insert data
        START TRANSACTION;

        -- Insert into PHONG
        INSERT INTO PHONG (MANHATRO, MAPHONG, MOTA, CHIEUDAI, CHIEURONG, NGAYTAO)
        VALUES (p_manhatro, p_maphong, p_mota, p_chieudai, p_chieurong, p_ngaytao);

        -- Insert into DICHVU_PHONG
        INSERT INTO DICHVU_PHONG (MANHATRO, MAPHONG, MADICHVU, GIA)
        VALUES (p_manhatro, p_maphong, p_madichvu1, p_gia1),
               (p_manhatro, p_maphong, p_madichvu2, p_gia2),
               (p_manhatro, p_maphong, p_madichvu3, p_gia3);

        -- Insert into CHISO
        INSERT INTO CHISO (NGAYGHI, MANHATRO, MAPHONG, MADICHVU, CHISOCU)
        VALUES 
               (p_ngaytao, p_manhatro, p_maphong, p_madichvu2, 0),
               (p_ngaytao, p_manhatro, p_maphong, p_madichvu3, 0);

        -- Commit transaction
        COMMIT;

        -- Return 1
        SET p_result = 1;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateNhaTro` (IN `p_manhatro` CHAR(10), IN `p_tennhatro` VARCHAR(100), IN `p_diadiem` VARCHAR(255), IN `p_chieudai` FLOAT, IN `p_chieurong` FLOAT, IN `p_ngaytao` DATE)   BEGIN
    UPDATE nhatro
    SET 
        TENNHATRO = p_tennhatro,
        DIADIEM = p_diadiem,
        CHIEUDAI = p_chieudai,
        CHIEURONG = p_chieurong,
        NGAYTAO = p_ngaytao
    WHERE 
        MANHATRO = p_manhatro;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `XoaHoaDon` (IN `p_MaHoaDon` CHAR(10))   BEGIN
    DECLARE v_Result INT DEFAULT 0;
    DECLARE v_Message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback nếu có lỗi xảy ra
        ROLLBACK;
        SET v_Result = 0;
        SET v_Message = 'Xóa hóa đơn không thành công. Đã xảy ra lỗi.';
        SELECT v_Result AS Result, v_Message AS Message;
    END;

  

    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Xóa các dòng liên quan trong bảng `chitiethd`
    DELETE FROM chitiethd
    WHERE MAHOADON = p_MaHoaDon;


    -- Xóa hóa đơn trong bảng `hoadon`
    DELETE FROM hoadon
    WHERE MAHOADON = p_MaHoaDon;

    -- Hoàn tất giao dịch
    COMMIT;

    -- Đặt kết quả thành công
    SET v_Result = 1;
    SET v_Message = 'Xóa hóa đơn thành công.';
    SELECT v_Result AS Result, v_Message AS Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `XoaNguoiDung` (IN `p_IDNguoiDung` CHAR(10))   BEGIN
    -- Declare a handler for exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        SELECT 0 AS Status, 'Lỗi, vui lòng thử lại' AS Message;
    END;

    -- Start transaction
    START TRANSACTION;

    -- Delete from nguoidung_phong table
    DELETE FROM nguoidung_phong
    WHERE IDNGUOIDUNG = p_IDNguoiDung;

    -- Delete from nguoidung table
    DELETE FROM nguoidung
    WHERE IDNGUOIDUNG = p_IDNguoiDung;

    -- Commit the transaction
    COMMIT;

    -- Return success status
    SELECT 1 AS Status, 'Xóa người dùng thành công' AS Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `XoaNhaTro` (IN `p_MaNhaTro` CHAR(10))   BEGIN
    DECLARE v_Result INT DEFAULT 0;
    DECLARE v_Message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback nếu có lỗi xảy ra
        ROLLBACK;
        SET v_Result = 0;
        SET v_Message = 'Xóa nhà trọ không thành công. Đã xảy ra lỗi.';
        SELECT v_Result AS Result, v_Message AS Message;
    END;


    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Xóa các dòng liên quan trong bảng `nguoidung_phong`
    DELETE FROM nguoidung_phong
    WHERE MANHATRO = p_MaNhaTro;

    -- Xóa các dòng liên quan trong bảng `chitiethd` và `hoadon`
    DELETE FROM chitiethd
    WHERE MAHOADON IN (
        SELECT MAHOADON
        FROM hoadon
        WHERE MANHATRO = p_MaNhaTro
    );

    DELETE FROM hoadon
    WHERE MANHATRO = p_MaNhaTro;

    -- Xóa các dòng liên quan trong bảng `chiso`
    DELETE FROM chiso
    WHERE MANHATRO = p_MaNhaTro;

    -- Xóa các dòng liên quan trong bảng `dichvu_phong`
    DELETE FROM dichvu_phong
    WHERE MANHATRO = p_MaNhaTro;

    -- Xóa các phòng liên quan trong bảng `phong`
    DELETE FROM phong
    WHERE MANHATRO = p_MaNhaTro;

    -- Xóa nhà trọ trong bảng `nhatro`
    DELETE FROM nhatro
    WHERE MANHATRO = p_MaNhaTro;

    -- Hoàn tất giao dịch
    COMMIT;

    -- Đặt kết quả thành công
    SET v_Result = 1;
    SET v_Message = 'Xóa nhà trọ thành công.';
    SELECT v_Result AS Result, v_Message AS Message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `XoaPhong` (IN `p_MaNhaTro` CHAR(10), IN `p_MaPhong` CHAR(10))   BEGIN
    DECLARE v_Result INT DEFAULT 0;
    DECLARE v_Message VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback nếu có lỗi xảy ra
        ROLLBACK;
        SET v_Result = 0;
        SET v_Message = 'Xóa phòng không thành công. Đã xảy ra lỗi.';
        SELECT v_Result AS Result, v_Message AS Message;
    END;

    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Xóa các dòng liên quan trong bảng `nguoidung_phong`
    DELETE FROM nguoidung_phong
    WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong;

    -- Xóa các dòng liên quan trong bảng `hoadon` và `chitiethd`
    DELETE FROM chitiethd
    WHERE MAHOADON IN (
        SELECT MAHOADON
        FROM hoadon
        WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong
    );

    DELETE FROM hoadon
    WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong;

    -- Xóa các dòng liên quan trong bảng `chiso`
    DELETE FROM chiso
    WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong;

    -- Xóa các dòng liên quan trong bảng `dichvu_phong`
    DELETE FROM dichvu_phong
    WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong;

    -- Xóa phòng trong bảng `phong`
    DELETE FROM phong
    WHERE MANHATRO = p_MaNhaTro AND MAPHONG = p_MaPhong;

    -- Hoàn tất giao dịch
    COMMIT;

    -- Đặt kết quả thành công
    SET v_Result = 1;
    SET v_Message = 'Xóa phòng thành công.';
    SELECT v_Result AS Result, v_Message AS Message;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chiso`
--

CREATE TABLE `chiso` (
  `NGAYGHI` date NOT NULL,
  `MANHATRO` char(10) NOT NULL,
  `MAPHONG` char(10) NOT NULL,
  `MADICHVU` char(10) NOT NULL,
  `CHISOCU` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chiso`
--

INSERT INTO `chiso` (`NGAYGHI`, `MANHATRO`, `MAPHONG`, `MADICHVU`, `CHISOCU`) VALUES
('2023-01-01', 'NT001', '5', 'DV001', 0),
('2023-01-01', 'NT001', '5', 'DV002', 0),
('2023-01-01', 'NT001', '5', 'DV003', 0),
('2023-01-01', 'NT001', '8', 'DV002', 0),
('2023-01-01', 'NT001', '8', 'DV003', 0),
('2023-01-01', 'NTRe0b0771', '1', 'DV002', 0),
('2023-01-01', 'NTRe0b0771', '1', 'DV003', 0),
('2023-01-01', 'NTRe0b0771', '2', 'DV002', 0),
('2023-01-01', 'NTRe0b0771', '2', 'DV003', 0),
('2023-01-02', 'NTR12ec4b7', '1', 'DV002', 0),
('2023-01-02', 'NTR12ec4b7', '1', 'DV003', 0),
('2023-01-02', 'NTR12ec4b7', '2', 'DV002', 0),
('2023-01-02', 'NTR12ec4b7', '2', 'DV003', 0),
('2023-01-09', 'NTRcab22ad', '1', 'DV002', 0),
('2023-01-09', 'NTRcab22ad', '1', 'DV003', 0),
('2023-01-15', 'NTRcab22ad', '1', 'DV002', 20),
('2023-01-15', 'NTRcab22ad', '1', 'DV003', 10),
('2023-02-15', 'NTRcab22ad', '1', 'DV002', 30),
('2023-02-15', 'NTRcab22ad', '1', 'DV003', 20),
('2023-03-02', 'NTRcab22ad', '1', 'DV002', 40),
('2023-03-02', 'NTRcab22ad', '1', 'DV003', 30),
('2023-03-15', 'NT001', '5', 'DV002', 55),
('2023-03-15', 'NT001', '5', 'DV003', 3),
('2023-05-05', 'NT001', '3', 'DV002', 0),
('2023-05-05', 'NT001', '3', 'DV003', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chitiethd`
--

CREATE TABLE `chitiethd` (
  `MAHOADON` char(10) NOT NULL,
  `MADICHVU` char(10) NOT NULL,
  `SOLUONGDASUDUNG` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitiethd`
--

INSERT INTO `chitiethd` (`MAHOADON`, `MADICHVU`, `SOLUONGDASUDUNG`) VALUES
('19203de0c3', 'DV001', 1),
('19203de0c3', 'DV002', 10),
('19203de0c3', 'DV003', 10),
('8628b24c89', 'DV001', 1),
('8628b24c89', 'DV002', 20),
('8628b24c89', 'DV003', 10),
('f5d0e46a65', 'DV001', 1),
('f5d0e46a65', 'DV002', 10),
('f5d0e46a65', 'DV003', 10),
('NT00153ef6', 'DV001', 1),
('NT00153ef6', 'DV002', 55),
('NT00153ef6', 'DV003', 3);

-- --------------------------------------------------------

--
-- Table structure for table `dichvu`
--

CREATE TABLE `dichvu` (
  `MADICHVU` char(10) NOT NULL,
  `TENDICHVU` varchar(100) DEFAULT NULL,
  `DONVITINH` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dichvu`
--

INSERT INTO `dichvu` (`MADICHVU`, `TENDICHVU`, `DONVITINH`) VALUES
('DV001', 'Thuê phòng', 'Phòng'),
('DV002', 'Điện', 'kw/h'),
('DV003', 'Nước', 'm3');

-- --------------------------------------------------------

--
-- Table structure for table `dichvu_phong`
--

CREATE TABLE `dichvu_phong` (
  `MANHATRO` char(10) NOT NULL,
  `MAPHONG` char(10) NOT NULL,
  `MADICHVU` char(10) NOT NULL,
  `gia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dichvu_phong`
--

INSERT INTO `dichvu_phong` (`MANHATRO`, `MAPHONG`, `MADICHVU`, `gia`) VALUES
('NT001', '3', 'DV001', 2500000),
('NT001', '3', 'DV002', 4000),
('NT001', '3', 'DV003', 8500),
('NT001', '4', 'DV001', 2000000),
('NT001', '4', 'DV002', 5500),
('NT001', '4', 'DV003', 10000),
('NT001', '5', 'DV001', 2000000),
('NT001', '5', 'DV002', 5500),
('NT001', '5', 'DV003', 9500),
('NT001', '8', 'DV001', 3000000),
('NT001', '8', 'DV002', 5500),
('NT001', '8', 'DV003', 9500),
('NTR002', '1', 'DV001', 2000000),
('NTR002', '1', 'DV002', 3500),
('NTR002', '1', 'DV003', 8500),
('NTR002', '2', 'DV001', 2000000),
('NTR002', '2', 'DV002', 3500),
('NTR002', '2', 'DV003', 8500),
('NTR002', '3', 'DV001', 2000000),
('NTR002', '3', 'DV002', 3500),
('NTR002', '3', 'DV003', 8500),
('NTR002', '4', 'DV001', 2000000),
('NTR002', '4', 'DV002', 3500),
('NTR002', '4', 'DV003', 8500),
('NTR002', '5', 'DV001', 2000000),
('NTR002', '5', 'DV002', 3500),
('NTR002', '5', 'DV003', 8500),
('NTR12ec4b7', '1', 'DV001', 2000000),
('NTR12ec4b7', '1', 'DV002', 3500),
('NTR12ec4b7', '1', 'DV003', 9000),
('NTR12ec4b7', '2', 'DV001', 1500000),
('NTR12ec4b7', '2', 'DV002', 3500),
('NTR12ec4b7', '2', 'DV003', 10000),
('NTRcab22ad', '1', 'DV001', 2000000),
('NTRcab22ad', '1', 'DV002', 3500),
('NTRcab22ad', '1', 'DV003', 4500),
('NTRe0b0771', '1', 'DV001', 2000000),
('NTRe0b0771', '1', 'DV002', 3500),
('NTRe0b0771', '1', 'DV003', 1000000),
('NTRe0b0771', '2', 'DV001', 5000000),
('NTRe0b0771', '2', 'DV002', 3500),
('NTRe0b0771', '2', 'DV003', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `MAHOADON` char(10) NOT NULL,
  `MANHATRO` char(10) DEFAULT NULL,
  `MAPHONG` char(10) DEFAULT NULL,
  `NGAYLAPHOADON` date DEFAULT NULL,
  `TONGTIEN` float DEFAULT NULL,
  `MATRANGTHAIHD` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`MAHOADON`, `MANHATRO`, `MAPHONG`, `NGAYLAPHOADON`, `TONGTIEN`, `MATRANGTHAIHD`) VALUES
('19203de0c3', 'NTRcab22ad', '1', '2023-02-15', 2080000, '1'),
('8628b24c89', 'NTRcab22ad', '1', '2023-01-15', 2115000, '1'),
('f5d0e46a65', 'NTRcab22ad', '1', '2023-03-02', 2080000, '1'),
('NT00153ef6', 'NT001', '5', '2023-03-15', 2331000, '2');

-- --------------------------------------------------------

--
-- Table structure for table `loainguoidung`
--

CREATE TABLE `loainguoidung` (
  `MALOAINGUOIDUNG` char(10) NOT NULL,
  `TENMALOAINGUOIDUNG` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loainguoidung`
--

INSERT INTO `loainguoidung` (`MALOAINGUOIDUNG`, `TENMALOAINGUOIDUNG`) VALUES
('LTK000', 'admin webiste'),
('LTK001', 'Chủ trọ'),
('LTK002', 'Người thuê phòng');

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `IDNGUOIDUNG` char(10) NOT NULL,
  `MALOAINGUOIDUNG` char(10) DEFAULT NULL,
  `MATKHAU` char(100) DEFAULT NULL,
  `HOTEN` varchar(100) DEFAULT NULL,
  `SODIENTHOAI` varchar(10) DEFAULT NULL,
  `ANHDIADIEN` varchar(100) DEFAULT NULL,
  `TAIKHOAN` char(100) DEFAULT NULL,
  `cccd` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`IDNGUOIDUNG`, `MALOAINGUOIDUNG`, `MATKHAU`, `HOTEN`, `SODIENTHOAI`, `ANHDIADIEN`, `TAIKHOAN`, `cccd`) VALUES
('1', 'LTK002', '1', 'shep', '0333333333', 'anh.jpg', 'user11', NULL),
('3', 'LTK002', '1', 'shep', '0333333333', 'anh.jpg', 'user12', NULL),
('adfs', 'LTK001', '$2a$10$YSM3a8DJcDwkv08c67gu6.16NPogIvj6mu0ahf.5xjbCt.yjMsWE.', 'Nha Ngô', NULL, NULL, 'chutro2@gmail.com', NULL),
('ffsdf', NULL, '$2a$10$c6lX8wnuIi5d5vzS4xnE2uNgSA1bPmEQXebKuXeLvItpEhPDaO/p2', 'Nha Ngô', NULL, NULL, 'chutro1@gmail.com', NULL),
('ND001', 'LTK001', '1', 'aaaaaaa', '0000000', 'nguyenvana.jpg', 'a', '000000'),
('ND0010', 'Ltk001', 'password', 'join shee', '0123456789', 'avatar.jpg', 'user001', NULL),
('ND002', 'LTK001', '1', 'Trần Thị B', '0912345678', 'tranthib.jpg', 'b', NULL),
('ND003', 'LTK002', '1', 'Phạm Văn C', '0923456789', 'phamvanc.jpg', 'c', NULL),
('ND004', 'LTK002', '1', 'Lê Thị D', '0934567890', 'lethid.jpg', 'd', NULL),
('USER041841', 'LTK002', '$2a$10$KCSqgkM6W0awoMyD/1z4Q.aLigxJyqsjPGRFcZE7IG.yfq0YDYZg6', 'Nguyễn Châu Liêm', '0337405155', '', 'USER236cda', NULL),
('USER04b08d', 'LTK002', '$2a$10$ZqAYWsgxSnwtZa2.PHZaveK/Gf56PcHQ.cseeEZX5yClsl31EZWcO', 'Nguyễn Văn D', '0334344444', '', 'nguyenvand', NULL),
('USER0e4566', 'LTK001', '$2a$10$f/zQ029g9BqK6QBUF56cBOdt8Q6gKaZiGBgo1D2z8XTgGry56YZt6', 'Võ Văn Xĩ 2', NULL, NULL, 'xi2@gmail.com', NULL),
('user11111', 'LTK002', '1', 'sheee e', '0123456789', 'avatar.jpg', 'user11111', NULL),
('USER12ca21', 'LTK002', '$2a$10$RLY4BRDJNZIcAuhz6UUrJu58p9K./MMYzVzTnd5g1qCZ5Q4wXYzj6', 'Nguyễn Châu Liêm 5', '0337443433', '', 'xi5@gmail.', NULL),
('USER1e9a53', 'LTK002', '$2a$10$pgVaIYUzNF0Rc7qP/9EXRusr//dnzchPCBV25QqBN5pssx85q3Lou', 'Nguyễn Văn E', '1111111111', '', 'nguyenvane', NULL),
('USER2b07cf', 'LTK001', '$2a$10$a8U57LLisraMHgD5chWVWeoLIO82a79UutM.UdxYEIV5fAhJqafEu', 'Thành nha', NULL, NULL, 'nhango@gmail.com', NULL),
('USER375912', 'LTK002', '11', 'Nguyễn Văn Võ', '0337405155', '', 'nha1', NULL),
('USER445690', 'LTK001', '$2a$10$5NH16486kuHSIAvkUIBNce5ksoYPvEfD2p1zbUXfJlJQYw1AIEMtm', 'nha chủ trọ', NULL, NULL, 'nhachutro1@gmail.com', NULL),
('USER4978c2', 'LTK002', '$2a$10$dxAGI6BPYTX6BrBM73vRsuB4Xma0iwLzNsdZULy.7XAXNWC2zN6nK', 'Nguyễn', '5435', '', 'nguyenvanb', '12312312'),
('USER97290c', 'LTK002', '$2a$10$DIVEPz2sscHUIr7Fm5D1auXuVu5IEo1lB4Rm5hye6JKWByUetGJkO', 'Người thuê trọ 1', '0337405155', '', '', NULL),
('USERa3160c', 'LTK002', '11', 'Nguyễn Văn Võ', '0337405155', '', 'nha2', NULL),
('USERb5e60f', 'LTK002', '11', 'Nguyễn Văn Võ', '0337405155', '', 'nhanguoidu', NULL),
('USERbdf1d0', 'LTK001', '$2a$10$DYU', 'Võ Văn Xĩ 1', NULL, NULL, 'xi1@gmail.com', NULL),
('USERc6ddc3', 'LTK002', '$2a$10$9o0qkuL1CKG5fennMbwiru0sPrGKCIO8FVkYWrGH01snmjOz.8vei', 'Nguyễn Châu Liêm 3', '0337405155', '', 'xi4@gmail.', NULL),
('USERca581d', 'LTK002', '$2a$10$Boj74i1M.jlt1QK2XhRhceVSyEfeWN9t/CaWykyV.q66Wpe40qc7G', 'Nguyễn Châu Liêm 1', '0337405155', '', 'xi3@gmail.', NULL),
('USERea5778', 'LTK002', '$2a$10$vsDpvhj7f721JMAjnOlT7eBJSfNZj9d6TwkjEot01E/PdEKrayWaW', 'Nguyễn Văn C', '0898786787', '', 'nguyenvanc', NULL),
('USERffbacd', 'LTK001', '$2a$10$pzv', 'Võ Văn Xĩ', NULL, NULL, 'xi@gmail.com', NULL),
('USR00111', 'LTK002', '1', 'Sơn Núi', '0337405155', 'anh.jpg', 'user22', NULL),
('USR003', 'LTK002', '1', 'Trần Văn C', '0923456789', 'avatar3.jpg', 'tranvanc', NULL),
('USR004', 'LTK002', '1', 'Phạm Thị D', '0934567890', 'avatar4.jpg', 'phamthid', NULL),
('USR005', 'LTK002', '1', 'Hoàng Văn E', '0945678901', 'avatar5.jpg', 'hoangvane', NULL),
('USR006', 'LTK002', 'pass113', 'Ngô Thị F', '0956789012', 'avatar6.jpg', 'ngothif', NULL),
('USR007', 'LTK002', 'pass114', 'Đinh Văn G', '0967890123', 'avatar7.jpg', 'dinhvang', NULL),
('USR008', 'LTK002', 'pass115', 'Vũ Thị H', '0978901234', 'avatar8.jpg', 'vuthih', NULL),
('USR009', 'LTK002', 'pass116', 'Phan Văn I', '0989012345', 'avatar9.jpg', 'phanvani', NULL),
('USR010', 'LTK002', 'pass117', 'Đoàn Thị K', '0990123456', 'avatar10.jpg', 'doanthik', NULL),
('usr23', NULL, '$2a$10$820f8fVVeZjZs5kNpcNk9O2SWer.XWFRYlfdvBXoEfrhpdrCuDkIS', 'nha', NULL, NULL, 'nha1@gmail.com', NULL),
('usr2313', NULL, '$2a$10$5t0', 'nha', NULL, NULL, 'nha@gmail.com', NULL),
('usr23131', NULL, '$2a$10$kKdMZwqxbtfIPgeGWWpy/OO3bLEm55fIfge5sl8K52Pp.P/xqgvS.', 'nha', NULL, NULL, 'nha5', NULL),
('usr2313122', NULL, '$2a$10$Pvk', 'nha', NULL, NULL, 'nha4', NULL),
('usr23131df', NULL, '$2a$10$hgX', 'nha', NULL, NULL, 'nha3', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung_phong`
--

CREATE TABLE `nguoidung_phong` (
  `MANHATRO` char(10) NOT NULL,
  `MAPHONG` char(10) NOT NULL,
  `IDNGUOIDUNG` char(10) NOT NULL,
  `NGAYVAOPHONG` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguoidung_phong`
--

INSERT INTO `nguoidung_phong` (`MANHATRO`, `MAPHONG`, `IDNGUOIDUNG`, `NGAYVAOPHONG`) VALUES
('NTR12ec4b7', '1', 'USER041841', '2023-01-15'),
('NTR12ec4b7', '1', 'USER97290c', '2023-01-15'),
('NTRe0b0771', '1', 'USERca581d', '2023-01-02'),
('NTRe0b0771', '2', 'USER12ca21', '2023-01-02'),
('NTRe0b0771', '2', 'USERc6ddc3', '2023-01-02'),
('NTR002', '2', 'USR008', '2023-01-15');

-- --------------------------------------------------------

--
-- Table structure for table `nhatro`
--

CREATE TABLE `nhatro` (
  `MANHATRO` char(10) NOT NULL,
  `IDNGUOIDUNG` char(10) DEFAULT NULL,
  `TENNHATRO` varchar(100) DEFAULT NULL,
  `DIADIEM` varchar(100) DEFAULT NULL,
  `NGAYTAO` date DEFAULT NULL,
  `CHIEUDAI` float DEFAULT NULL,
  `CHIEURONG` float DEFAULT NULL,
  `ANHDIDIEN` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhatro`
--

INSERT INTO `nhatro` (`MANHATRO`, `IDNGUOIDUNG`, `TENNHATRO`, `DIADIEM`, `NGAYTAO`, `CHIEUDAI`, `CHIEURONG`, `ANHDIDIEN`) VALUES
('NT001', 'ND001', 'aa', 'an kahnh', '2024-01-03', 22, 33, 'greenhouse.jpg'),
('NT002', 'ND001', 'test 1', 'can tho', '2020-12-01', 8.8, 8.9, 'sieuxinh.jpg'),
('NT003', '3', 'Cánh đồng xanh', '72 Lý Tự Trọng, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh', '2023-01-23', 8.8, 5.6, 'canhdongxanh.jpg'),
('NTR002', 'ND001', 'Nhà trọ Bình Minh', '456 Đường Bình Minh, Quận 2, TP.HCM', '2023-02-01', 25, 18, 'nhatro_binhminh.jpg'),
('NTR12ec4b7', 'USER2b07cf', 'Nhà trọ 1', 'Nguyễn Văn Cừ, P, Ninh Kiều, Cần Thơ , Việt Nam', '2023-01-01', 23, 22, ''),
('NTR327ef94', 'ND001', 'Nha Ngô Trọ', 'Đường Số 9, An Bình, Ninh Kiều, Cần Thơ, Việt Nam', '2023-01-01', 49, 20, ''),
('NTR542c55f', 'ND001', 'Giấc mơ 1', 'Số 15, Đường Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội', '2023-01-01', 3.5, 5.3, ''),
('NTRcab22ad', 'USER445690', 'Quê hương', 'Nguyễn Văn Cừ', '2023-01-02', 23, 32, ''),
('NTRe0b0771', 'USER445690', 'Nha Ngô Trọ', 'Đường Số 9, An Bình, Ninh Kiều, Cần Thơ, Việt Nam', '2023-01-01', 50, 20, '');

-- --------------------------------------------------------

--
-- Table structure for table `phong`
--

CREATE TABLE `phong` (
  `MANHATRO` char(10) NOT NULL,
  `MAPHONG` char(10) NOT NULL,
  `MOTA` varchar(100) DEFAULT NULL,
  `CHIEUDAI` float DEFAULT NULL,
  `CHIEURONG` float DEFAULT NULL,
  `NGAYTAO` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phong`
--

INSERT INTO `phong` (`MANHATRO`, `MAPHONG`, `MOTA`, `CHIEUDAI`, `CHIEURONG`, `NGAYTAO`) VALUES
('NT001', '3', 'Phòng vip pro', 5.5, 8.6, '2023-05-05'),
('NT001', '4', 'Phòng thoáng mát với đầy đủ tiện nghi', 5.6, 3.4, '2023-01-01'),
('NT001', '5', 'Xinh lung linh', 7.8, 9, '2023-01-01'),
('NT001', '8', 'Xinh lung linh', 7.8, 9, '2023-01-01'),
('NTR002', '1', 'Phòng 1 - Máy lạnh, giường đơn', 4.5, 3.5, '2023-02-05'),
('NTR002', '2', 'Phòng 2 - Quạt trần, giường đôi', 5, 4, '2023-02-10'),
('NTR002', '3', 'Phòng 3 - Có ban công, giường đôi', 5.5, 4.5, '2023-02-15'),
('NTR002', '4', 'Phòng 4 - Không nội thất', 4, 3, '2023-02-20'),
('NTR002', '5', 'Phòng 5 - Full nội thất, máy lạnh', 5, 4, '2023-02-25'),
('NTR002', '6', 'Đẹp, thoáng mát', 3.5, 3.5, '2023-01-15'),
('NTR12ec4b7', '1', 'Sạch đẹp, thoáng mát', 6, 4, '2023-01-02'),
('NTR12ec4b7', '2', 's', 10, 2, '2023-01-02'),
('NTRcab22ad', '1', 'Phòng thoáng mát với đầy đủ tiện nghi', 23, 2, '2023-01-09'),
('NTRe0b0771', '1', 'Phòng thoáng mát với đầy đủ tiện nghi', 6.7, 8.9, '2023-01-01'),
('NTRe0b0771', '2', 'Phòng thoáng mát với đầy đủ tiện nghi', 9.9, 8.7, '2023-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `trangthaihd`
--

CREATE TABLE `trangthaihd` (
  `MATRANGTHAIHD` char(10) NOT NULL,
  `TENTRANGTHAIHD` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trangthaihd`
--

INSERT INTO `trangthaihd` (`MATRANGTHAIHD`, `TENTRANGTHAIHD`) VALUES
('1', 'Đã đóng'),
('2', 'Chưa đóng');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chiso`
--
ALTER TABLE `chiso`
  ADD PRIMARY KEY (`NGAYGHI`,`MANHATRO`,`MAPHONG`,`MADICHVU`),
  ADD KEY `FK_CHISO_MANHATRO_MAPHONG` (`MANHATRO`,`MAPHONG`),
  ADD KEY `FK_CHISO_MADICHVU` (`MADICHVU`);

--
-- Indexes for table `chitiethd`
--
ALTER TABLE `chitiethd`
  ADD PRIMARY KEY (`MAHOADON`,`MADICHVU`),
  ADD KEY `FK_CHITIETHD_MADICHVU` (`MADICHVU`);

--
-- Indexes for table `dichvu`
--
ALTER TABLE `dichvu`
  ADD PRIMARY KEY (`MADICHVU`);

--
-- Indexes for table `dichvu_phong`
--
ALTER TABLE `dichvu_phong`
  ADD PRIMARY KEY (`MANHATRO`,`MAPHONG`,`MADICHVU`),
  ADD KEY `FK_DICHVU_PHONG_MADICHVU` (`MADICHVU`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MAHOADON`),
  ADD KEY `FK_HOADON_MANHATRO_MAPHONG` (`MANHATRO`,`MAPHONG`),
  ADD KEY `HOADON_MATRANGTHAIHD` (`MATRANGTHAIHD`);

--
-- Indexes for table `loainguoidung`
--
ALTER TABLE `loainguoidung`
  ADD PRIMARY KEY (`MALOAINGUOIDUNG`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`IDNGUOIDUNG`),
  ADD KEY `FK_NGUOIDUNG_MALOAINGUOIDUNG` (`MALOAINGUOIDUNG`);

--
-- Indexes for table `nguoidung_phong`
--
ALTER TABLE `nguoidung_phong`
  ADD PRIMARY KEY (`MAPHONG`,`IDNGUOIDUNG`,`MANHATRO`),
  ADD KEY `FK_NGUOIDUNG_PHONG_PHONG` (`MANHATRO`,`MAPHONG`),
  ADD KEY `FK_NGUOIDUNG_PHONG_NGUOIDUNG` (`IDNGUOIDUNG`);

--
-- Indexes for table `nhatro`
--
ALTER TABLE `nhatro`
  ADD PRIMARY KEY (`MANHATRO`),
  ADD KEY `FK_NHATRO_IDNGUOIDUNG` (`IDNGUOIDUNG`);

--
-- Indexes for table `phong`
--
ALTER TABLE `phong`
  ADD PRIMARY KEY (`MANHATRO`,`MAPHONG`);

--
-- Indexes for table `trangthaihd`
--
ALTER TABLE `trangthaihd`
  ADD PRIMARY KEY (`MATRANGTHAIHD`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chiso`
--
ALTER TABLE `chiso`
  ADD CONSTRAINT `FK_CHISO_MADICHVU` FOREIGN KEY (`MADICHVU`) REFERENCES `dichvu` (`MADICHVU`),
  ADD CONSTRAINT `FK_CHISO_MANHATRO_MAPHONG` FOREIGN KEY (`MANHATRO`,`MAPHONG`) REFERENCES `phong` (`MANHATRO`, `MAPHONG`);

--
-- Constraints for table `chitiethd`
--
ALTER TABLE `chitiethd`
  ADD CONSTRAINT `FK_CHITIETHD_MADICHVU` FOREIGN KEY (`MADICHVU`) REFERENCES `dichvu` (`MADICHVU`),
  ADD CONSTRAINT `FK_CHITIETHD_MAHOADON` FOREIGN KEY (`MAHOADON`) REFERENCES `hoadon` (`MAHOADON`);

--
-- Constraints for table `dichvu_phong`
--
ALTER TABLE `dichvu_phong`
  ADD CONSTRAINT `FK_DICHVU_PHONG_MADICHVU` FOREIGN KEY (`MADICHVU`) REFERENCES `dichvu` (`MADICHVU`),
  ADD CONSTRAINT `FK_DICHVU_PHONG_MANHATRO_MAPHONG` FOREIGN KEY (`MANHATRO`,`MAPHONG`) REFERENCES `phong` (`MANHATRO`, `MAPHONG`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `FK_HOADON_MANHATRO_MAPHONG` FOREIGN KEY (`MANHATRO`,`MAPHONG`) REFERENCES `phong` (`MANHATRO`, `MAPHONG`),
  ADD CONSTRAINT `HOADON_MATRANGTHAIHD` FOREIGN KEY (`MATRANGTHAIHD`) REFERENCES `trangthaihd` (`MATRANGTHAIHD`);

--
-- Constraints for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `FK_NGUOIDUNG_MALOAINGUOIDUNG` FOREIGN KEY (`MALOAINGUOIDUNG`) REFERENCES `loainguoidung` (`MALOAINGUOIDUNG`);

--
-- Constraints for table `nguoidung_phong`
--
ALTER TABLE `nguoidung_phong`
  ADD CONSTRAINT `FK_NGUOIDUNG_PHONG_NGUOIDUNG` FOREIGN KEY (`IDNGUOIDUNG`) REFERENCES `nguoidung` (`IDNGUOIDUNG`),
  ADD CONSTRAINT `FK_NGUOIDUNG_PHONG_PHONG` FOREIGN KEY (`MANHATRO`,`MAPHONG`) REFERENCES `phong` (`MANHATRO`, `MAPHONG`);

--
-- Constraints for table `nhatro`
--
ALTER TABLE `nhatro`
  ADD CONSTRAINT `FK_NHATRO_IDNGUOIDUNG` FOREIGN KEY (`IDNGUOIDUNG`) REFERENCES `nguoidung` (`IDNGUOIDUNG`);

--
-- Constraints for table `phong`
--
ALTER TABLE `phong`
  ADD CONSTRAINT `FK_PHONG_NHATRO` FOREIGN KEY (`MANHATRO`) REFERENCES `nhatro` (`MANHATRO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
