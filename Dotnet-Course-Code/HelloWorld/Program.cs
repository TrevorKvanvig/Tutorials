using System;
using System.Data;
using Dapper;
using HelloWorld.Models;
using Microsoft.Data.SqlClient;

namespace HelloWorld
{
    internal class Program
    {
      static void Main(string[] args){
        string connectionString = "Server=localhost;Database=DotNetCourseDatabase;TrustServerCertificate=true;Trusted_Connection=false;User ID=SA;Password=D1mcBWHP";

        IDbConnection dbConnection = new SqlConnection(connectionString);

        string sqlCommand = "SELECT GETDATE()";

        DateTime RightNow = dbConnection.QuerySingle<DateTime>(sqlCommand);

        Computer myComputer = new Computer(){
          Motherboard= "Z90df4",
          CPUCores = 8,
          HasWifi = true,
          HasLTE = false,
          ReleaseDate = DateTime.Now,
          Price = 12.56m,
          VideoCard = "RTX 3090"
        };

        string sql = @"INSERT INTO TutorialAppSchema.Computer (
          Motherboard,
          CPUCores,
          HasWifi,
          HasLTE,
          ReleaseDate,
          Price,
          VideoCard
        ) VALUES ('" + myComputer.Motherboard 
            + "','" + myComputer.CPUCores
            + "','" + myComputer.HasWifi
            + "','" + myComputer.HasLTE
            + "','" + myComputer.ReleaseDate.ToString("yyyy-MM-dd")
            + "','" + myComputer.Price
            + "','" + myComputer.VideoCard 
        + "')";

        string sqlSelect = @"Select 
          Computer.Motherboard, 
          Computer.CPUCores, 
          Computer.HasWifi, 
          Computer.HasLTE, 
          Computer.ReleaseDate, 
          Computer.Price, 
          Computer.VideoCard
        FROM TutorialAppSchema.Computer";

        IEnumerable<Computer> computers = dbConnection.Query<Computer>(sqlSelect);

        foreach (Computer singleComputer in computers){
          Console.WriteLine("'" + myComputer.Motherboard 
            + "','" + myComputer.CPUCores
            + "','" + myComputer.HasWifi
            + "','" + myComputer.HasLTE
            + "','" + myComputer.ReleaseDate.ToString("yyyy-MM-dd")
            + "','" + myComputer.Price
            + "','" + myComputer.VideoCard 
        + "')");
        }
        Console.WriteLine(sqlSelect); 
      }
    }
}