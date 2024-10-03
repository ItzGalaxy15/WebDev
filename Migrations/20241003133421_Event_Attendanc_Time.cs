using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class Event_Attendanc_Time : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "Time",
                table: "Event_Attendance",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 1,
                column: "Time",
                value: null);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 2,
                column: "Time",
                value: null);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 3,
                column: "Time",
                value: null);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 4,
                column: "Time",
                value: null);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 5,
                column: "Time",
                value: null);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 6,
                column: "Time",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Event_Attendance");
        }
    }
}
