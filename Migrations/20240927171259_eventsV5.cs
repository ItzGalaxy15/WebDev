using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class eventsV5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "Event_Attendance");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Event_Attendance");

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    ReviewId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Feedback = table.Column<string>(type: "TEXT", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    Event_AttendanceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_Review_Event_Attendance_Event_AttendanceId",
                        column: x => x.Event_AttendanceId,
                        principalTable: "Event_Attendance",
                        principalColumn: "Event_AttendanceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Review",
                columns: new[] { "ReviewId", "Event_AttendanceId", "Feedback", "Rating" },
                values: new object[,]
                {
                    { 1, 1, "It was decent", 3 },
                    { 2, 3, "It was awesome", 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Review_Event_AttendanceId",
                table: "Review",
                column: "Event_AttendanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_ReviewId",
                table: "Review",
                column: "ReviewId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "Event_Attendance",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Event_Attendance",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 1,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was excellent", 5 });

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 2,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was bad", 2 });

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 3,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was good", 4 });

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 4,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was awful", 1 });

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 5,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was okay", 3 });

            migrationBuilder.UpdateData(
                table: "Event_Attendance",
                keyColumn: "Event_AttendanceId",
                keyValue: 6,
                columns: new[] { "Feedback", "Rating" },
                values: new object[] { "It was decent", 3 });
        }
    }
}
